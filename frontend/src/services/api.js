import axios from "axios";
import { logout } from "../utils/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 20000,
  withCredentials: true,
});

/**
 * Attach token automatically to every request
 */
API.interceptors.request.use((req) => {
  // Backward compatibility: if an old token exists in localStorage, still send it.
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;

  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      logout();
      // Avoid forcing redirects here; pages can decide how to handle unauthenticated state.
    }
    return Promise.reject(err);
  }
);

export default API;