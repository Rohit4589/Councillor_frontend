// src/api/categoriesApi.js
import axiosInstance from "./axiosInstance";

/* ======================================================
   GET CATEGORIES (REAL BACKEND ONLY)
====================================================== */
export const getCategories = async () => {
  const response = await axiosInstance.get("/api/admin/category");

  // If backend returns unexpected structure, fail fast
  if (!response?.data?.success) {
    throw new Error("Failed to fetch categories");
  }

  return response.data.data.map((item) => ({
    id: item.category_id,
    name: item.category_name,
    count: Number(item.total_complaints || 0),
    phone: item.phone_number || "—",
  }));
};

/* ======================================================
   ADD CATEGORY
====================================================== */
export const addCategory = async (data) => {
  const response = await axiosInstance.post("/api/admin/category", {
    category_name: data.name,
    phone_number: data.phone,
  });

  return response.data;
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */
export const updateCategory = async (id, data) => {
  const response = await axiosInstance.put(
    `/api/admin/category/${id}`,
    {
      category_name: data.name,
      phone_number: data.phone,
    }
  );

  return response.data;
};

/* ======================================================
   DELETE CATEGORY
====================================================== */
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(
    `/api/admin/category/${id}`
  );

  return response.data;
};

/* ======================================================
   GET CATEGORY OFFICERS
   (Backend not ready yet – return empty)
====================================================== */
export const getCategoryOfficers = async () => {
  return { officers: [] };
};