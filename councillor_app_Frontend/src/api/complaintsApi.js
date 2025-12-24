// src/api/complaintsApi.js

const BASE_URL = "http://localhost:8080/api/complaints";

/* ===============================
   GET ALL COMPLAINTS
   =============================== */
export const getComplaints = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch complaints");
  }

  const data = await response.json();

  // Normalize backend response to match UI shape
  return data.map((item) => ({
    id: item.id || item.complaintId || item._id,
    category: item.category,
    summary: item.summary,
    status: item.status,
    ward: item.ward,
    date: item.date,
  }));
};

/* ===============================
   GET COMPLAINT BY ID (DETAILS PAGE)
   =============================== */
export const getComplaintById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch complaint details");
  }

  const data = await response.json();

  // normalize backend response to match UI
  return {
    id: data.id || data.complaintId || data._id,
    category: data.category,
    summary: data.summary,
    description: data.description,
    ward: data.ward,
    date: data.date,
    location: data.location,
    statusTimeline: data.statusTimeline || [],
    citizen: {
      name: data.citizen?.name,
      phone: data.citizen?.phone,
    },
    images: data.images || [],
  };
};
