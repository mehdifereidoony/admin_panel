import { api } from "./axiosInstance";

export const getAttributesService = (id) => {
  return api.get(`/admin/categories/${id}/attributes`);
};

export const createAttributesService = (id, data) => {
  return api.post(`/admin/categories/${id}/attributes`, data);
};

export const editAttributesService = (id, data) => {
  return api.put(`/admin/categories/attributes/${id}`, data);
};

export const deleteAttributesService = (id) => {
  return api.delete(`/admin/categories/attributes/${id}`);
};
