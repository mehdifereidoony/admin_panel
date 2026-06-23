import { api } from "./axiosInstance";

export const getCategories = (categoryParent = null) => {
  return api.get(
    `/admin/categories${categoryParent ? `?parent=${categoryParent}` : ""}`
  );
};

export const addCategoriesService = (data) => {
  if (data.image) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("descriptions", data.descriptions);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("is_active", data.is_active);
    formData.append("show_in_menu", data.show_in_menu);
    if (data.parent_id) {
      formData.append("parent_id", data.parent_id);
    }
    data = formData;
  }
  return api.post("/admin/categories", data);
};
