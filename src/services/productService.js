import { api } from "./axiosInstance";

export const getProductsService = (page, count, searchChar) => {
  return api.get(
    `/admin/products${page ? `?page=${page}` : ""}${
      count ? `&count=${count}` : ""
    }${searchChar ? `&searchChar=${searchChar}` : ""}`
  );
};

export const addProductService = (formData) => {
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  return api.post("/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
