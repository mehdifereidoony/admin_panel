import { api } from "./axiosInstance";

export const getProductsService = (page, count, searchChar) => {
  return api.get(
    `/admin/products${page ? `?page=${page}` : ""}${
      count ? `&count=${count}` : ""
    }${searchChar ? `&searchChar=${searchChar}` : ""}`
  );
};
