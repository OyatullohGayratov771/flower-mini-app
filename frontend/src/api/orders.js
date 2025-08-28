import api from "./client";
export const listMyOrders = () => api.get("/user/orders");
export const createOrder = (payload) => api.post("/user/orders", payload);
// admin
export const adminListOrders = () => api.get("/admin/orders");
export const adminSetOrderStatus = (id, status) => api.put(`/admin/orders/${id}/status`, { status });