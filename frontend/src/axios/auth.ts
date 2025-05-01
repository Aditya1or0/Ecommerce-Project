import axios from "axios";

export const api = axios.create({
  baseURL: "https://ecommerce-project-rktn.onrender.com/auth",
  timeout: 5000,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
