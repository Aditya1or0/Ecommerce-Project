import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/auth",
  timeout: 5000,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
