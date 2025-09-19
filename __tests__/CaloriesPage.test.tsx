import { render, screen } from "@testing-library/react";
import CaloriesPage from "@/app/calories/page";
import { useMealStore } from "@/stores/mealStore";
import { useAuthStore } from "@/stores/authStore";

jest.mock("@/stores/mealStore", () => ({
  useMealStore: jest.fn(),
}));
jest.mock("@/stores/authStore", () => ({
  useAuthStore: jest.fn(),
}));

describe("CaloriesPage", () => {
  beforeEach(() => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: jest.fn(),
    });
  });

  it("renders nutrition results", () => {
    (useMealStore as unknown as jest.Mock).mockReturnValue({
      result: {
        dish_name: "Pizza",
        total_calories: 500,
        servings: 2,
        calories_per_serving: 250,
      },
    });

    render(<CaloriesPage />);

    expect(screen.getByText("Nutrition Result")).toBeInTheDocument();
    expect(screen.getByText(/Pizza/)).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("250")).toBeInTheDocument();
  });

  it("renders nothing when no result", () => {
    (useMealStore as unknown as jest.Mock).mockReturnValue({ result: null });

    render(<CaloriesPage />);
    expect(screen.queryByText("Nutrition Result")).not.toBeInTheDocument();
  });
});
