// src/api/categories.js
import client from "./client";

export async function getCategories() {
  return client.get("/categories");
}
