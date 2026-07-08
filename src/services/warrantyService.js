import { api } from "./axiosInstance";

export const getWarrantiesService = () => {
  return api.get("/admin/guarantees");
};

export const addWarrantiesService = (data) => {
  return api.post("/admin/guarantees", data);
};

export const editWarrantiesService = (id, data) => {
  return api.put(`/admin/guarantees/${id}`, data);
};

export const deleteWarrantiesService = (id) => {
  return api.delete(`/admin/guarantees/${id}`);
};
