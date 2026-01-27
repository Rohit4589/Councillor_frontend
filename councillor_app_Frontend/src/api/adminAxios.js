import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://councillor-app123.vercel.app/api", // ✅ ADD /api
  headers: {
    "Content-Type": "application/json",
  },
});

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAxios;
