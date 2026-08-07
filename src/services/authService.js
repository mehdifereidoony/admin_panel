import { api } from "./axiosInstance";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const getCurrentUserService = (token) => {
  return api.get("/auth/user");
};
