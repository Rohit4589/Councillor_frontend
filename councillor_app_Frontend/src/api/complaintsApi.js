import axiosInstance from "./axiosInstance";


/* ===============================
   STATUS MAPPER
================================ */
const mapBackendStatus = (status) => {
  switch (status) {
    case "submitted":
    case "SUBMITTED":
      return "submitted";
    case "in_progress":
    case "IN_PROGRESS":
      return "progress";
    case "completed":
    case "COMPLETED":
      return "completed";
    default:
      return "submitted";
  }
};

/* ===============================
   DATE FORMAT
================================ */
const formatDateTime = (date) => {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d)) return date;

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/* ===============================
   GET ALL COMPLAINTS
================================ */
export const getComplaints = async ({
  councillorId,
  limit = 20,
  offset = 0,
  filters = {},
} = {}) => {
  const response = await axiosInstance.get("/complaints", {
    params: {
      councillor_id: councillorId,
      limit,
      offset,
      ...filters,
    },
  });

  return response.data.data.map((c) => ({
    id: c.id,
    category: c.category_id === 1 ? "Water Supply" : `Category ${c.category_id}`,
    summary: c.title,
    status: mapBackendStatus(c.status),
    ward: `Ward ${c.ward_id}`,
    date: formatDateTime(c.created_at),
  }));
};

/* ===============================
   GET COMPLAINT BY ID
================================ */
export const getComplaintById = async (id) => {
  const response = await axiosInstance.get(`/complaints/${id}`);
  const c = response.data.data;

  return {
    id: c.id,
    category: c.category_id === 1 ? "Water Supply" : `Category ${c.category_id}`,
    summary: c.title,
    description: c.description,
    ward: `Ward ${c.ward_id}`,
    date: formatDateTime(c.created_at),
    location: c.location,
    status: mapBackendStatus(c.status),
    citizen: {
      phone: c.description?.match(/\+91-\d+/)?.[0] || "-",
    },
    images: [],
  };
};
