import api from "./client";
export const listCategories = () => api.get("/categories");
export const adminCreateCategory = (data) => api.post("/admin/categories", data);
export const adminDeleteCategory = (id) => api.delete(`/admin/categories/${id}`);