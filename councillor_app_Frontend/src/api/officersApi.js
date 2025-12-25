// src/api/officersApi.js
import { faker } from "@faker-js/faker";

const BASE_URL = "http://localhost:5000/officers";

/* ===============================
   FAKER FALLBACK
================================ */
const generateFakeOfficers = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.number.int({ min: 100, max: 999 }),
    name: faker.person.fullName(),
    phone: faker.phone.number("+91 9#########"),
  }));
};

/* ===============================
   GET ALL OFFICERS
================================ */
export const getOfficers = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error("API failed");
    }

    const result = await response.json();

    // Backend format → UI format
    return result.data.map((item) => ({
      id: item.officer_id,
      name: item.name,
      phone: item.phone_number,
    }));
  } catch (error) {
    console.warn("⚠️ Officers API failed, using faker data");
    return generateFakeOfficers();
  }
};
