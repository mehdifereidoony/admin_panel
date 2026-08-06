import { api } from "./axiosInstance";

export const getPermissionsService = () => {
  return api.get("/admin/permissions");
};

export const getRolesService = () => {
  return api.get("/admin/roles");
};

export const createRolesService = (data) => {
  return api.post("/admin/roles", data);
};

export const updateRoleService = (id , data) => {
  return api.put(`/admin/roles/${id}`, data);
};

export const updateRolePermissionsService = (id , data) => {
  return api.put(`/admin/roles/${id}/permissions`, data);
};

export const deleteRolesService = (id) => {
  return api.delete(`/admin/roles/${id}`);
};