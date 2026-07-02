import { api } from "./axiosInstance";

export const getBrandsService = () => {
  return api.get("/admin/brands");
};

export const addBrandsService = (data) => {
  if (data.logo) {
    const formData = new FormData();
    formData.append("original_name", data.original_name);
    formData.append("persian_name", data.persian_name);
    formData.append("descriptions", data.descriptions);
    if (data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }
    data = formData;
  }
  return api.post("/admin/brands", data);
};
