import { api } from "./axiosInstance";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const checkTokenValidity = (token)=>{
  return api.get("/auth/user")
}