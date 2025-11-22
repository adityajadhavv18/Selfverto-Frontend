import { useEffect, useRef } from "react";
import { usePosts } from "@/features/posts/usePosts";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import CreatePostDialog from "@/components/CreatePostDialog";
import { useDispatch } from "react-redux";
import { resetFeed } from "@/features/posts/postSlice";
const Feed = () => {
  const { feed, loading, page, hasMore, fetchFeed } = usePosts();
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(resetFeed()); // 📌 RESET FEED WHEN PAGE LOADS
      fetchFeed(1);
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-1 mt-10 p-10">
        <div className="flex justify-between items-center mb-10">
          <CreatePostDialog />
        </div>

        {/* GRID FEED */}
        <div className="grid grid-cols-3 gap-6">
          {feed.map((post) => (
            <PostCard
              key={post.id}
              content={post.content}
              imageUrl={post.imageUrl}
              author={post.author}
            />
          ))}
        </div>

        {/* LOAD MORE */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <Button disabled={loading} onClick={() => fetchFeed(page)}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
