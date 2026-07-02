import { api } from "./axiosInstance";

export const getBrandsService = () => {
  return api.get("/admin/brands");
};
