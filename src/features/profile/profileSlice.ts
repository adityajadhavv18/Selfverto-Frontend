import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "@/api/profileApi";
import { type ProfileState } from "./profileTypes";

export const fetchProfileThunk = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const res = await profileApi.getMyProfile();
    return res.data.data;
  }
);

export const fetchMyPostsThunk = createAsyncThunk(
  "profile/fetchMyPosts",
  async () => {
    const res = await profileApi.getMyPosts();
    return res.data.data;
  }
);

export const uploadProfilePictureThunk = createAsyncThunk(
  "profile/uploadPicture",
  async (file: File, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await profileApi.uploadProfilePicture(form);

      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const initialState: ProfileState = {
  profile: null,
  myPosts: [],
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchMyPostsThunk.fulfilled, (state, action) => {
        state.myPosts = action.payload;
      })
      .addCase(uploadProfilePictureThunk.fulfilled, (state, action) => {
        state.profile!.profilePictureUrl = action.payload.url;
      });
  },
});

export default profileSlice.reducer;
