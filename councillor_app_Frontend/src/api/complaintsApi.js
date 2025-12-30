import { faker } from "@faker-js/faker";
// import axios from "axios";

const USE_FAKE_DATA = true;

/* ===============================
   BACKEND → FRONTEND MAPPERS
   =============================== */

// backend: IN_PROGRESS | SUBMITTED | COMPLETED
// frontend: progress | submitted | completed | seen
const mapBackendStatus = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return "progress";
    case "SUBMITTED":
      return "submitted";
    case "COMPLETED":
      return "completed";
    default:
      return "submitted";
  }
};

const buildTimelineFromBackend = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return ["Submitted", "Seen", "In Progress"];
    case "COMPLETED":
      return ["Submitted", "Seen", "In Progress", "Completed"];
    case "SUBMITTED":
    default:
      return ["Submitted"];
  }
};

/* ===============================
   ✅ ADDED: DATE + TIME FORMATTER
   =============================== */
const formatDateTime = (date) => {
  const d = new Date(date);

  return d.toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/* ===============================
   GET ALL COMPLAINTS
   =============================== */
export const getComplaints = async ({
  councillorId,
  limit = 20,
  offset = 0,
  filters = {},
} = {}) => {
  if (USE_FAKE_DATA) {
    return Array.from({ length: 8 }, () => {
      const backendStatuses = ["IN_PROGRESS", "SUBMITTED", "COMPLETED"];
      const backendStatus = faker.helpers.arrayElement(backendStatuses);

      const rawDate = faker.date.recent(); // 👈 added for clarity

      return {
        id: faker.string.alphanumeric(8).toUpperCase(), // complaint_id
        category: faker.helpers.arrayElement([
          "Street Lights",
          "Garbage Collection",
          "Water Supply",
          "Roads & Potholes",
        ]),
        summary: faker.lorem.sentence(6),
        status: mapBackendStatus(backendStatus),
        ward: `Ward ${faker.number.int({ min: 1, max: 20 })}`,
        // date: formatDateTime(rawDate), // ✅ DATE + TIME
        date: rawDate.toISOString(), // ✅ or rawDate itself
      };
    });
  }

  /* ===============================
     BACKEND IMPLEMENTATION (READY)
     =============================== */
  /*
  const response = await axios.get(
    `/admin/complaints/my`,
    {
      params: {
        councillorid: councillorId,
        limit,
        offset,
        ...filters,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.map((c) => ({
    id: c.complaint_id,
    category: c.category,
    summary: c.summary,
    status: mapBackendStatus(c.status),
    ward: c.ward,
    date: formatDateTime(c.date), // ✅ DATE + TIME
  }));
  */

  return [];
};

/* ===============================
   GET COMPLAINT BY ID
   =============================== */
export const getComplaintById = async (id) => {
  if (USE_FAKE_DATA) {
    const backendStatuses = ["IN_PROGRESS", "SUBMITTED", "COMPLETED"];
    const backendStatus = faker.helpers.arrayElement(backendStatuses);

    const rawDate = faker.date.recent();

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
      // date: formatDateTime(rawDate), // ✅ DATE + TIME
      date: rawDate.toISOString(),
      location: faker.location.street(),
      status: mapBackendStatus(backendStatus),
      statusTimeline: buildTimelineFromBackend(backendStatus),
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

  /* ===============================
     BACKEND IMPLEMENTATION (READY)
     =============================== */
  /*
  const response = await axios.get(
    `/admin/complaints/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const c = response.data.data;

  return {
    id: c.complaint_id,
    category: c.category,
    summary: c.summary,
    description: c.description,
    ward: c.ward,
    date: formatDateTime(c.date), // ✅ DATE + TIME
    location: c.location,
    status: mapBackendStatus(c.status),
    statusTimeline: buildTimelineFromBackend(c.status),
    citizen: c.citizen,
    images: c.images || [],
  };
  */

  return null;
};
