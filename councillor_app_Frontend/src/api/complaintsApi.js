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
        date: faker.date.recent().toISOString().split("T")[0],
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
    date: c.date,
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
    date: c.date,
    location: c.location,
    status: mapBackendStatus(c.status),
    statusTimeline: buildTimelineFromBackend(c.status),
    citizen: c.citizen,
    images: c.images || [],
  };
  */

  return null;
};
