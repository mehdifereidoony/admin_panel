import { api } from "./axiosInstance";

export const getColorsService = () => {
  return api.get("/admin/colors");
};

export const addColorsService = (data) => {
  return api.post("/admin/colors", data);
};

export const editColorsService = (id, data) => {
  return api.put(`/admin/colors/${id}`, data);
};

export const deleteColorsService = (id) => {
  return api.delete(`/admin/colors/${id}`);
};
