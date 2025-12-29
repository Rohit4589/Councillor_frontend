import axios from "axios";

/* ================================
   BASE CONFIG
================================ */

// const BASE_URL = "http://localhost:5000/api"; // 🔴 enable later

/* ================================
   SUPER ADMIN - COUNCILLORS APIs
================================ */

// 🔹 GET all councillors
export const getCouncillors = async () => {
  // 🔴 BACKEND VERSION (ENABLE LATER)
  /*
  const response = await axios.get(`${BASE_URL}/councillors`);
  return response.data;
  */

  // ✅ TEMP STATIC (fallback)
  return [];
};

// 🔹 UPDATE councillor
export const updateCouncillor = async (id, payload) => {
  // 🔴 BACKEND VERSION (ENABLE LATER)
  /*
  const response = await axios.put(
    `${BASE_URL}/councillors/${id}`,
    payload
  );
  return response.data;
  */

  // ✅ TEMP
  return payload;
};

// 🔹 CREATE councillor
export const createCouncillor = async (payload) => {
  // 🔴 BACKEND VERSION (ENABLE LATER)
  /*
  const response = await axios.post(
    `${BASE_URL}/councillors`,
    payload
  );
  return response.data;
  */

  // ✅ TEMP
  return payload;
};
