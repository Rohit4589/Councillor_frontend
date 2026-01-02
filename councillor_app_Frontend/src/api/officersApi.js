// src/api/officersApi.js
import { faker } from "@faker-js/faker";
import axiosInstance from "./axiosInstance";

/* ===============================
   FAKER FALLBACK
================================ */
const generateFakeOfficers = (count = 10) => {
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
    const response = await axiosInstance.get("/officers");

    return response.data.data.map((item) => ({
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
    const response = await axiosInstance.post(
      "/officers",
      officer
    );

    const d = response.data.data;

    return {
      id: d.officer_id,
      name: d.name,
      designation: d.designation,
      department: d.department,
      phone: d.phone_number,
    };
  } catch (err) {
    console.warn("⚠️ Add API failed → local insert only");
    return {
      id: Date.now(),
      ...officer,
    };
  }
};
