import axios from "axios";

/* ================================
   BASE CONFIG
================================ */

const BASE_URL = "http://localhost:3000/api";

/* ================================
   AXIOS INSTANCE
================================ */

const api = axios.create({
  baseURL: BASE_URL,
});

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================================
   SUPER ADMIN - COUNCILLORS APIs
================================ */

// 🔹 GET all councillors
export const getCouncillors = async () => {
  const res = await api.get("/admin/councillors");
  return res.data.data; // ✅ unwrap { success, message, data }
};

// 🔹 CREATE councillor
export const createCouncillor = async (payload) => {
  const res = await api.post("/admin/councillors", payload);
  return res.data.data;
};

// 🔹 UPDATE councillor
export const updateCouncillor = async (id, payload) => {
  const res = await api.put(`/admin/councillors/${id}`, payload);
  return res.data.data;
};

// 🔹 DELETE councillor
export const deleteCouncillor = async (id) => {
  const res = await api.delete(`/admin/councillors/${id}`);
  return res.data;
};
