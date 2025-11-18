import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../app/store";
import { loginThunk, signupThunk, logout } from "./authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    token,
    loading,
    error,
    login: (data: any) => dispatch(loginThunk(data)),
    signup: (data: any) => dispatch(signupThunk(data)),
    logout: () => dispatch(logout()),
  };
};
