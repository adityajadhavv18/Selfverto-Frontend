import axiosClient from "./axiosClient";

export const profileApi = {
  getMyProfile: () => axiosClient.get("/users/me"),

  getMyPosts: () => axiosClient.get("/posts/mine"),

  uploadProfilePicture: (formData: FormData) =>
    axiosClient.post("/upload/profile-picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
