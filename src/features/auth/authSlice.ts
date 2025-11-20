// src/features/auth/authSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import type {
  AuthState,
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from "./authTypes";

const initialState: AuthState = {
  user: null,
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token") || null
      : null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.login(payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Login failed");
  }
});

export const signupThunk = createAsyncThunk<
  AuthResponse,
  SignupRequest,
  { rejectValue: string }
>("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.signup(payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Signup failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      if (typeof window !== "undefined") localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        if (typeof window !== "undefined")
          localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Login failed";
    });

    // SIGNUP
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      signupThunk.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        if (typeof window !== "undefined")
          localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Signup failed";
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
