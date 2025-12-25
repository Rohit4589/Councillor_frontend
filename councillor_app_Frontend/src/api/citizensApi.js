// src/api/citizensApi.js
import { faker } from "@faker-js/faker";

const BASE_URL = "http://localhost:5000/api/admin";

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
    aadhar: faker.string.numeric(12),
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
    const res = await fetch(`${BASE_URL}/users?role=citizen`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) throw new Error("API failed");

    const json = await res.json();

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
    const res = await fetch(`${BASE_URL}/userdetails?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) throw new Error("Details API failed");

    const json = await res.json();

    const d = json.data;

    return {
      name: d.name,
      phone: d.phone_number,
      email: d.email,
      ward: d.ward,
      aadhar: d.aadhar_number,
      city: d.city,
      state: d.state,
      bloodGroup: d.blood_group,
      disability: d.disability,
      language: d.language,
    };
  } catch {
    // fallback from faker
    return generateFakeCitizens(1)[0];
  }
};
