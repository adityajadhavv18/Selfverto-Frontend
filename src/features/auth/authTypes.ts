export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AuthState {
  user: null | AuthResponse["data"];
  token: string | null;
  loading: boolean;
  error: string | null;
}
