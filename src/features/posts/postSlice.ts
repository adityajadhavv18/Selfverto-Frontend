import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "@/api/postApi";
import { type PostsState } from "./postTypes";

export const fetchFeedThunk = createAsyncThunk(
  "posts/fetchFeed",
  async (page: number, { rejectWithValue }) => {
    try {
      const res = await postApi.getFeed(page);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const initialState: PostsState = {
  feed: [],
  loading: false,
  page: 1,
  hasMore: true,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetFeed: (state) => {
      state.feed = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedThunk.fulfilled, (state, action) => {
        state.loading = false;

        const newPosts = action.payload.data;
        const meta = action.payload.meta;

        state.feed = [...state.feed, ...newPosts];
        state.page += 1;

        if (state.feed.length >= meta.total) {
          state.hasMore = false;
        }
      })
      .addCase(fetchFeedThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetFeed } = postSlice.actions;
export default postSlice.reducer;
