export interface PostResponse {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: string;
  author?: {
    id: string; // ADD THIS
    name: string;
    email: string;
  };
}

export interface PostsState {
  feed: PostResponse[];
  loading: boolean;
  myPosts: PostResponse[];
  page: number;
  hasMore: boolean;
}
