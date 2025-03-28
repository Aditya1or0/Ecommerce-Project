import axios from "axios";

export const api = axios.create({
    baseURL: "https://fakestoreapi.com/products",
    timeout: 5000,

})
// Request Interceptor
api.interceptors.request.use(
    (request) => {
        // console.log("Request sent:", request);
        return request;
    },
    (error) => {
        // console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // console.log("Response received:", response);
        return response;
    },
    (error) => {
        // console.error("Response error:", error);
        return Promise.reject(error);
    }
)