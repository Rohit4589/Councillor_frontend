// src/api/categoriesApi.js
import { faker } from "@faker-js/faker";
import axiosInstance from "./axiosInstance";

/* ======================================================
   CONFIG
====================================================== */
const USE_FAKE_DATA = true; // 🔁 change to false when backend is ready

/* ======================================================
   FAKE DATA
====================================================== */
const generateFakeCategories = (count = 8) =>
  Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
    name: faker.helpers.arrayElement([
      "Street Lights",
      "Roads & Potholes",
      "Garbage Collection",
      "Water Supply",
      "Parks & Gardens",
      "Public Toilets",
      "Street Cleaning",
      "Traffic Signals",
    ]),
    count: faker.number.int({ min: 10, max: 300 }),
    phone: faker.phone.number("9#########"),
  }));

const generateFakeOfficers = (count = 3) =>
  Array.from({ length: count }).map(() => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    phone: faker.phone.number("9#########"),
  }));

/* ======================================================
   GET CATEGORIES
====================================================== */
export const getCategories = async () => {
  if (USE_FAKE_DATA) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(generateFakeCategories()), 500)
    );
  }

  const response = await axiosInstance.get("/admin/category");

  return response.data.data.map((item) => ({
    id: item.category_id,
    name: item.category_name,
    count: item.total_complaints,
    phone: item.phone_number,
  }));
};

/* ======================================================
   ADD CATEGORY
====================================================== */
export const addCategory = async (data) => {
  if (USE_FAKE_DATA) {
    return Promise.resolve({ success: true });
  }

  const response = await axiosInstance.post(
    "/admin/category",
    {
      category_name: data.name,
      phone_number: data.phone,
    }
  );

  return response.data;
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */
export const updateCategory = async (id, data) => {
  if (USE_FAKE_DATA) {
    return Promise.resolve({ success: true });
  }

  const response = await axiosInstance.put(
    `/admin/category/${id}`,
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
  if (USE_FAKE_DATA) {
    return Promise.resolve({ success: true });
  }

  const response = await axiosInstance.delete(
    `/admin/category/${id}`
  );

  return response.data;
};

/* ======================================================
   GET CATEGORY OFFICERS (FAKE ONLY FOR NOW)
====================================================== */
export const getCategoryOfficers = async (categoryId) => {
  if (USE_FAKE_DATA) {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            categoryId,
            officers: generateFakeOfficers(3),
          }),
        400
      )
    );
  }
};
