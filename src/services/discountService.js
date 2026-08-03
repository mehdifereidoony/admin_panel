import { api } from "./axiosInstance";

export const getDiscountsService = () => {
  return api.get("/admin/discounts");
};

export const createDiscountsService = (data) => {
  return api.post("/admin/discounts", data);
};

export const editDiscountsService = (id, data) => {
  return api.put(`/admin/discounts/${id}`, data);
};

export const deleteDiscountsService = (id) => {
  return api.delete(`/admin/discounts/${id}`);
};