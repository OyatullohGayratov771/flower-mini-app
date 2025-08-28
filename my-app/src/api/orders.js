// src/api/orders.js
import client from "./client";

export async function getOrders() {
  return client.get("/orders");
}

export async function createOrder(orderData) {
  return client.post("/orders", orderData);
}
