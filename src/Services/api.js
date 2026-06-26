import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7010/api",
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let unauthorizedTriggered = false;

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !unauthorizedTriggered) {
      unauthorizedTriggered = true;

      // Clear invalid login
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Notify React
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));

      // Allow future events after a short delay
      setTimeout(() => {
        unauthorizedTriggered = false;
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default api;
