import axiosClient from "./axiosClient";
import { type PostResponse } from "@/features/posts/postTypes";

export const postApi = {
  getFeed: (page: number) =>
    axiosClient.get<{ data: PostResponse[]; meta: any }>(
      `/posts/feed?page=${page}&limit=6`
    ),
  create: (formData: FormData) =>
    axiosClient.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
