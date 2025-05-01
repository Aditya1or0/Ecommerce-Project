import axios from "axios";

export const api = axios.create({
  baseURL: "https://ecommerce-project-rktn.onrender.com/favorites",
  timeout: 5000,
});
