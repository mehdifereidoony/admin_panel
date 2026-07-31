import { api } from "./axiosInstance";

export const getDiscountsService = () => {
  return api.get("/admin/discounts");
};
