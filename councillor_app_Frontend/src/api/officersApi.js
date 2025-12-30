// src/api/officersApi.js
import { faker } from "@faker-js/faker";

const BASE_URL = "http://localhost:5000/officers";

/* ===============================
   FAKER FALLBACK
================================ */
const generateFakeOfficers = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    designation: faker.person.jobTitle(),
    department: faker.commerce.department(),
    phone: faker.phone.number("9#########"),
  }));
};

/* ===============================
   GET ALL OFFICERS
================================ */
export const getOfficers = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) throw new Error("API failed");

    const result = await response.json();

    return result.data.map((item) => ({
      id: item.officer_id,
      name: item.name,
      designation: item.designation,
      department: item.department,
      phone: item.phone_number,
    }));
  } catch (err) {
    console.warn("⚠️ API failed → using faker data");
    return generateFakeOfficers();
  }
};

/* ===============================
   ADD OFFICER (OPTIONAL BACKEND)
================================ */
export const addOfficer = async (officer) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(officer),
    });

    if (!response.ok) throw new Error("Add failed");

    const result = await response.json();

    return {
      id: result.data.officer_id,
      name: result.data.name,
      designation: result.data.designation,
      department: result.data.department,
      phone: result.data.phone_number,
    };
  } catch (err) {
    console.warn("⚠️ Add API failed → local insert only");
    return {
      id: Date.now(),
      ...officer,
    };
  }
};
