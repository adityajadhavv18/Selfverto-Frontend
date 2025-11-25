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

export const deletePostThunk = createAsyncThunk(
  "posts/delete",
  async (postId: string, { rejectWithValue }) => {
    try {
      const res = await postApi.delete(postId);
      console.log("Created post:", res.data);
      return postId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const initialState: PostsState = {
  feed: [],
  loading: false,
  page: 1,
  hasMore: true,
  myPosts: [],
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
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        const id = action.payload;

        state.feed = state.feed.filter((p) => p.id !== id);
        state.myPosts = state.myPosts.filter((p) => p.id !== id);
      });
  },
});

export const { resetFeed } = postSlice.actions;
export default postSlice.reducer;
