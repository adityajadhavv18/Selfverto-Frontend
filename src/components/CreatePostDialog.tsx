import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePosts } from "@/features/posts/usePosts";
import { postApi } from "@/api/postApi";

const CreatePostDialog = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { fetchFeed } = usePosts();

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const createPost = async () => {
    if (!content && !image) return;

    const form = new FormData();
    form.append("content", content);
    form.append("isPublic", "true");
    if (image) form.append("image", image);

    setUploading(true);

    await postApi.create(form); // Will define soon

    setUploading(false);
    setContent("");
    setImage(null);
    setPreview(null);
    setOpen(false);

    fetchFeed(1); // refresh feed
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full">Create New Post</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>Create Post</DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Share something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Image Input */}
          <input type="file" accept="image/*" onChange={handleFile} />

          {/* Preview */}
          {preview && (
            <img src={preview} className="w-full rounded-lg border" />
          )}

          <Button disabled={uploading} onClick={createPost}>
            {uploading ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
