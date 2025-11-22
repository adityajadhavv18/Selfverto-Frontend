export interface ProfileState {
  profile: {
    id: string;
    name: string;
    email: string;
    profilePictureUrl?: string;
  } | null;

  myPosts: {
    id: string;
    imageUrl?: string;
    content: string;
  }[];

  loading: boolean;
}
