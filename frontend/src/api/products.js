import api from "./client";
export const fetchProducts = (params) => api.get("/products", { params });
export const fetchProductBySlug = (slug) => api.get(`/products/${slug}`);

export const adminListProducts = () => api.get("/admin/products");
export const adminCreateProduct = (data) => api.post("/admin/products", data);
export const adminUpdateProduct = (id, data) => api.put(`/admin/products/${id}`, data);
export const adminDeleteProduct = (id) => api.delete(`/admin/products/${id}`);
export const adminUploadProductPhoto = (data) => api.post("/admin/products/upload_photo", data);