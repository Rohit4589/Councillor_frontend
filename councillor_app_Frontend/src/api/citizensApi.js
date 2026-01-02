// src/api/citizensApi.js
import { faker } from "@faker-js/faker";
import axiosInstance from "./axiosInstance";

/* ===============================
   FAKE DATA FALLBACK
================================ */
const generateFakeCitizens = (count = 15) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.number.int({ min: 1, max: 9999 }),
    name: faker.person.fullName(),
    phone: faker.phone.number("+91 ##########"),
    ward: `Ward ${faker.number.int({ min: 1, max: 30 })}`,
    email: faker.internet.email(),
    VoterId: faker.string.numeric(10),
    city: faker.location.city(),
    state: faker.location.state(),
    bloodGroup: faker.helpers.arrayElement(["A+", "B+", "O+", "AB+"]),
    disability: "None",
    language: faker.helpers.arrayElement(["English", "Hindi", "Marathi"]),
  }));
};

/* ===============================
   GET CITIZENS LIST
================================ */
export const getCitizens = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/admin/users",
      {
        params: {
          "role-citizen": true,
        },
      }
    );

    const json = response.data;

    return json.data.map((item) => ({
      id: item.citizen_id,
      name: item.name,
      phone: item.phone_number,
      ward: item.ward,
      email: item.email,
    }));
  } catch (err) {
    console.warn("Citizens API failed, using faker data");
    return generateFakeCitizens();
  }
};

/* ===============================
   GET CITIZEN DETAILS
================================ */
export const getCitizenDetails = async (id) => {
  try {
    const response = await axiosInstance.get(
      "/api/admin/userdetalls",
      {
        params: { id },
      }
    );

    const d = response.data.data;

    return {
      name: d.name,
      phone: d.phone_number,
      email: d.email,
      ward: d.ward,
      VoterId: d.Voter_id,
      city: d.city,
      state: d.state,
      bloodGroup: d.blood_group,
      disability: d.disability,
      language: d.language,
    };
  } catch {
    return generateFakeCitizens(1)[0];
  }
};
