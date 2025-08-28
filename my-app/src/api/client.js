// src/api/client.js
const API_BASE = "http://localhost:8080/api"; // backend base URL

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `API error: ${response.status}`;
    try {
      const data = await response.json();
      message = data.error || message;
    } catch (e) {}
    throw new Error(message);
  }

  return response.json();
}

export default {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => request(path, { method: "DELETE" }),
};
