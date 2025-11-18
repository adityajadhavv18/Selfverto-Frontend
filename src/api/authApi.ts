import axiosClient from "./axiosClient";
import {
  type LoginRequest,
  type SignupRequest,
  type AuthResponse,
} from "../features/auth/authTypes";

export const authApi = {
  login: (data: LoginRequest) =>
    axiosClient.post<AuthResponse>("/auth/login", data),

  signup: (data: SignupRequest) =>
    axiosClient.post<AuthResponse>("/auth/signup", data),

  getProfile: () => axiosClient.get("/users/me"),
};
