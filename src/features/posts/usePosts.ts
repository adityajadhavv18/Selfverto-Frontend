import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "@/app/store";
import { fetchFeedThunk } from "./postSlice";

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { feed, loading, page, hasMore } = useSelector(
    (state: RootState) => state.posts
  );

  return {
    feed,
    loading,
    page,
    hasMore,
    fetchFeed: (page: number) => dispatch(fetchFeedThunk(page)),
  };
};
