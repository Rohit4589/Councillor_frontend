import axiosInstance from "./axiosInstance";

/* ===============================
   LOGIN API
================================ */
export const loginApi = (payload) => {
  return axiosInstance.post("/api/auth/login", payload);
};
