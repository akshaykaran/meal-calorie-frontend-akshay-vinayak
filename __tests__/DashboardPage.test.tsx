import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import { useAuthStore } from "@/stores/authStore";
import { getCalories } from "@/lib/api";

jest.mock("@/stores/authStore", () => ({
  useAuthStore: jest.fn(),
}));
jest.mock("@/lib/api", () => ({
  getCalories: jest.fn(),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { token: "fake-token" },
      logout: jest.fn(),
    });
  });

  it("renders form inputs", () => {
    render(<DashboardPage />);
    expect(
      screen.getByPlaceholderText("Enter the name of the dish")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter servings in numbers")
    ).toBeInTheDocument();
  });

  it("submits form and calls API", async () => {
    (getCalories as unknown as jest.Mock).mockResolvedValue({
      total_calories: 200,
      servings: 2,
      calories_per_serving: 100,
    });

    render(<DashboardPage />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter the name of the dish"),
      { target: { value: "Pizza" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Enter servings in numbers"), {
      target: { value: 2 },
    });

    fireEvent.click(screen.getByText("Check Nutrition Value"));

    await waitFor(() => {
      expect(getCalories).toHaveBeenCalledWith(
        { dish_name: "Pizza", servings: 2 },
        "fake-token"
      );
    });
  });
});
