// src/api/categoriesApi.js
import { faker } from "@faker-js/faker";

/* ======================================================
   CONFIG
====================================================== */
const USE_FAKE_DATA = true; // 🔁 change to false when backend is ready

const BASE_URL = "http://localhost:5000/admin/category";

/* ======================================================
   OFFICERS (ASSIGNED TO CATEGORY)
====================================================== */

// const CATEGORY_OFFICERS_URL =
//   "http://localhost:5000/admin/category";


/* ======================================================
   FAKE DATA (FOR TESTING)
====================================================== */
const generateFakeCategories = (count = 8) => {
  return Array.from({ length: count }).map((_, index) => ({
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
};

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
  // 🧪 Fake mode
  if (USE_FAKE_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(generateFakeCategories()), 500);
    });
  }

  // 🌐 Real API
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const json = await res.json();

  return json.data.map((item) => ({
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
    return Promise.resolve({
      success: true,
      message: "Category created (fake)",
    });
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      category_name: data.name,
      phone_number: data.phone,
    }),
  });

  if (!res.ok) throw new Error("Add category failed");

  return res.json();
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */
export const updateCategory = async (id, data) => {
  if (USE_FAKE_DATA) {
    return Promise.resolve({
      success: true,
      message: "Category updated (fake)",
    });
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      category_name: data.name,
      phone_number: data.phone,
    }),
  });

  if (!res.ok) throw new Error("Update category failed");

  return res.json();
};

/* ======================================================
   DELETE CATEGORY
====================================================== */
export const deleteCategory = async (id) => {
  if (USE_FAKE_DATA) {
    return Promise.resolve({
      success: true,
      message: "Category deleted (fake)",
    });
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Delete category failed");

  return res.json();
};

/* ======================================================
   GET OFFICERS ASSIGNED TO A CATEGORY
====================================================== */

export const getCategoryOfficers = async (categoryId) => {
  // 🧪 Fake mode
  if (USE_FAKE_DATA) {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            categoryId,
            officers: generateFakeOfficers(3),
          }),
        400
      );
    });
  }}
//
//   // 🌐 Real API
//   const res = await fetch(
//     `${CATEGORY_OFFICERS_URL}/${categoryId}/officers`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }
//   );
//
//   if (!res.ok) throw new Error("Failed to fetch officers");
//
//   const json = await res.json();
//
//   return {
//     categoryId,
//     officers: json.data.map((item) => ({
//       id: item.officer_id,
//       name: item.officer_name,
//       phone: item.phone_number,
//     })),
//   };
// };
