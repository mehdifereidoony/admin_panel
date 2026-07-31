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

export const updateProductService = (id, data) => {
  return api.put(`/admin/products/${id}`, data);
};

export const deleteProductService = (id) => {
  return api.delete(`/admin/products/${id}`);
};
