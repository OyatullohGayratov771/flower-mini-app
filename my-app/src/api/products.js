// src/api/products.js
import client from "./client";

export async function getProducts() {
  return client.get("/products");
}

export async function getProduct(slug) {
  return client.get(`/products/${slug}`);
}
