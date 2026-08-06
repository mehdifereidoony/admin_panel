import { api } from "./axiosInstance";

// permissions
export const getPermissionsService = () => {
  return api.get("/admin/permissions");
};


// roles
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

// users 
export const getUsersService = () => {
  return api.get("/admin/users");
};

export const createUsersService = (data) => {
  return api.post("/admin/users", data);
};

export const updateUsersService = (id , data) => {
  return api.put(`/admin/users/${id}`, data);
};

export const deleteUsersService = (id) => {
  return api.delete(`/admin/users/${id}`);
};