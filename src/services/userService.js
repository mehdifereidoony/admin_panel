import { api } from "./axiosInstance";

export const getPermissionsService = () => {
  return api.get("/admin/permissions");
};