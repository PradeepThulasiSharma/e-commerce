import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginResponse {
  message: string;
  error?: string;
}

export async function loginUser(username: string, password: string) {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/api/login`,
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
}