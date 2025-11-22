import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { useProfile } from "@/features/profile/useProfile";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { profile, myPosts, fetchProfile, fetchMyPosts, uploadProfilePicture } =
    useProfile();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchProfile();
    fetchMyPosts();
  }, []);

  const handleProfilePicSelect = () => {
    fileInputRef.current?.click();
  };

  const uploadPicture = (e: any) => {
    const file = e.target.files[0];
    if (file) uploadProfilePicture(file);
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 max-w-4xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center gap-10 mb-10">
          {/* Avatar */}
          <div className="relative">
            <img
              src={
                profile?.profilePictureUrl ||
                "https://via.placeholder.com/150?text=User"
              }
              className="w-32 h-32 rounded-full border object-cover"
            />

            <Button
              size="sm"
              className=" bg-gray relative left-4"
              onClick={handleProfilePicSelect}
            >
              Change
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={uploadPicture}
            />
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{profile?.name}</h2>
            <p className="text-gray-600">{profile?.email}</p>
          </div>
        </div>

        {/* MY POSTS GRID */}
        <h3 className="text-xl font-semibold mb-4">My Posts</h3>

        {myPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {myPosts.map((post: (typeof myPosts)[0]) => (
              <img
                key={post.id}
                src={post.imageUrl || "https://via.placeholder.com/200"}
                className="w-full h-40 object-cover rounded-md border"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
