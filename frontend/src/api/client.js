import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
});

// ✅ Agar Telegram WebApp initData kerak bo‘lsa:
api.interceptors.request.use((config) => {
  const tg = window?.Telegram?.WebApp;
  if (tg?.initData) {
    config.headers["X-Telegram-InitData"] = tg.initData;
  }
  return config;
});

export default api;
