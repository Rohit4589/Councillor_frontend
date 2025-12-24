// src/api/citizensApi.js

const BASE_URL = "http://localhost:5000/api/citizens";

/* ===============================
   GET ALL CITIZENS
   =============================== */
export const getCitizens = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch citizens");
  }

  const data = await response.json();

  // Normalize backend response for UI
  return data.map((item) => ({
    id: item.id || item.citizenId || item._id,
    name: item.name,
    phone: item.phone,
    ward: item.ward,
    email: item.email,
    aadhar: item.aadhar,
    city: item.city,
    state: item.state,
    bloodGroup: item.bloodGroup,
    disability: item.disability,
    language: item.language,
  }));
};
