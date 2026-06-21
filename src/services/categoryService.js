import { api } from "./axiosInstance";

export const getCategories = (categoryParent = null) => {
  return api.get(
    `/admin/categories${categoryParent ? `?parent=${categoryParent}` : ""}`
  );
};
