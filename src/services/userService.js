import { api } from "./axiosInstance";

export const getPermissionsService = () => {
  return api.get("/admin/permissions");
};

export const getRolesService = () => {
  return api.get("/admin/roles");
};

export const deleteRolesService = (id) => {
  return api.delete(`/admin/roles${id}`);
};