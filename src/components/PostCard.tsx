import { Card, CardContent } from "@/components/ui/card";

interface Props {
  content: string;
  imageUrl?: string;
  author?: { name: string };
}

const PostCard = ({ content, imageUrl, author }: Props) => {
  return (
    <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <CardContent className="p-0">
        {/* Image */}
        {imageUrl && (
          <img src={imageUrl} alt="post" className="w-full h-48 object-cover" />
        )}

        {/* Info */}
        <div className="p-3 space-y-1">
          <p className="text-sm text-gray-900 font-medium line-clamp-2">
            {content}
          </p>

          <p className="text-xs text-gray-500">
            {author?.name ?? "Unknown User"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
