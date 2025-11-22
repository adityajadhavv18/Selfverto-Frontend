export interface PostResponse {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: string;
  author?: {
    name: string;
    email: string;
  };
}

export interface PostsState {
  feed: PostResponse[];
  loading: boolean;
  page: number;
  hasMore: boolean;
}
