// src/api/complaintsApi.js
import { faker } from "@faker-js/faker";

const USE_FAKE_DATA = true;

/* ===============================
   STATUS → TIMELINE MAPPER
   =============================== */
const buildTimeline = (status) => {
  switch (status) {
    case "submitted":
      return ["Submitted"];
    case "seen":
      return ["Submitted", "Seen"];
    case "progress":
      return ["Submitted", "Seen", "In Progress"];
    case "completed":
      return ["Submitted", "Seen", "In Progress", "Completed"];
    default:
      return ["Submitted"];
  }
};

/* ===============================
   GET ALL COMPLAINTS
   =============================== */
export const getComplaints = async () => {
  if (USE_FAKE_DATA) {
    return Array.from({ length: 8 }, () => {
      const statuses = ["submitted", "seen", "progress", "completed"];
      const status = faker.helpers.arrayElement(statuses);

      return {
        id: faker.string.alphanumeric(8).toUpperCase(),
        category: faker.helpers.arrayElement([
          "Street Lights",
          "Garbage Collection",
          "Water Supply",
          "Roads & Potholes",
        ]),
        summary: faker.lorem.sentence(6),
        status, // 🔥 SINGLE SOURCE OF TRUTH
        ward: `Ward ${faker.number.int({ min: 1, max: 20 })}`,
        date: faker.date.recent().toISOString().split("T")[0],
      };
    });
  }

  // backend later
  return [];
};

/* ===============================
   GET COMPLAINT BY ID
   =============================== */
export const getComplaintById = async (id) => {
  if (USE_FAKE_DATA) {
    const statuses = ["submitted", "seen", "progress", "completed"];
    const status = faker.helpers.arrayElement(statuses);

    return {
      id,
      category: faker.helpers.arrayElement([
        "Street Lights",
        "Garbage Collection",
        "Water Supply",
        "Roads & Potholes",
      ]),
      summary: faker.lorem.sentence(6),
      description: faker.lorem.paragraph(),
      ward: `Ward ${faker.number.int({ min: 1, max: 20 })}`,
      date: faker.date.recent().toISOString().split("T")[0],
      location: faker.location.street(),
      status,
      statusTimeline: buildTimeline(status), // ✅ FIX
      citizen: {
        name: faker.person.fullName(),
        phone: faker.phone.number("+91 ##########"),
      },
      images: [
        "https://picsum.photos/600/400?1",
        "https://picsum.photos/600/400?2",
        "https://picsum.photos/600/400?3",
      ],
    };
  }

  return null;
};
