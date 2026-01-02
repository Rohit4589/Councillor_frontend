// src/api/superAdminCouncillorsApi.js
import axiosInstance from "../../axiosInstance";

/* ================================
   SUPER ADMIN - COUNCILLORS APIs
================================ */

// 🔹 GET all councillors
export const getCouncillors = async () => {
  const res = await axiosInstance.get("/admin/councillors");
  return res.data.data; // ✅ unwrap { success, message, data }
};

// 🔹 CREATE councillor
export const createCouncillor = async (payload) => {
  const res = await axiosInstance.post("/admin/councillors", payload);
  return res.data.data;
};

// 🔹 UPDATE councillor
export const updateCouncillor = async (id, payload) => {
  const res = await axiosInstance.put(`/admin/councillors/${id}`, payload);
  return res.data.data;
};

// 🔹 DELETE councillor
export const deleteCouncillor = async (id) => {
  const res = await axiosInstance.delete(`/admin/councillors/${id}`);
  return res.data;
};
