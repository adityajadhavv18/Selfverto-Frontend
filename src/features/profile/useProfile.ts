import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "@/app/store";
import {
  fetchProfileThunk,
  fetchMyPostsThunk,
  uploadProfilePictureThunk,
} from "./profileSlice";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, myPosts, loading } = useSelector(
    (state: RootState) => state.profile
  );

  return {
    profile,
    myPosts,
    loading,
    fetchProfile: () => dispatch(fetchProfileThunk()),
    fetchMyPosts: () => dispatch(fetchMyPostsThunk()),
    uploadProfilePicture: (file: File) =>
      dispatch(uploadProfilePictureThunk(file)),
  };
};
