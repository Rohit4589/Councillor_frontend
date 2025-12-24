// src/api/officersApi.js

const BASE_URL = "http://localhost:5000/api/officers";

/* ===============================
   GET ALL OFFICERS
   =============================== */
export const getOfficers = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch officers");
  }

  const data = await response.json();

  // Normalize backend response to UI format
  return data.map((item) => ({
    id: item.id || item.officerId || item._id,
    name: item.name,
    phone: item.phone,
  }));
};
