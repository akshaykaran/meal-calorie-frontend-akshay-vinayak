export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "API-KEY": apiKey || "",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || error.error|| "API Request Failed");
  }

  return res.json();
}

//REGISTER NEW USER
interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

//LOGIN USER
interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


//GET CALORIES API

interface CaloriesPayload {
  dish_name: string;
  servings: number;
}

interface CaloriesResponse {
  total_calories: number;
  servings: number;
  calories_per_serving: number;
  dailyIntake: string;
  dish:string;
}

export async function getCalories(
  payload: CaloriesPayload,
  token: string
): Promise<CaloriesResponse> {
  return apiRequest<CaloriesResponse>("/get-calories", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}
