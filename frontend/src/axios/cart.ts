import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/cart",
  headers: {
    "Content-Type": "application/json",
  },
});
