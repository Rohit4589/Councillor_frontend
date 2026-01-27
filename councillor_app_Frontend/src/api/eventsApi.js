// src/api/eventsApi.js
import adminAxios from "./adminAxios";

/* ===============================
   GET EVENT CATEGORIES (ADMIN)
   API: GET /api/admin/category
================================ */
export const getEventCategories = async () => {
  const response = await adminAxios.get("/admin/category");

  return response.data.data.map((item) => ({
    id: item.category_id,
    name: item.category_name,
  }));
};

/* ===============================
   CREATE ANNOUNCEMENT / EVENT
   API: POST /api/admin/announcement
   Content-Type: multipart/form-data
================================ */
export const createEvent = async ({
  event_name,
  category_id,
  description,
  photos = [],
  video = null,
}) => {
  const formData = new FormData();

  // REQUIRED FIELDS
  formData.append("event_name", event_name);
  formData.append("category_id", category_id);
  formData.append("description", description);

  // PHOTOS (0–5)
  photos.forEach((file) => {
    formData.append("photos[]", file);
  });

  // VIDEO (OPTIONAL)
  if (video) {
    formData.append("video", video);
  }

  const response = await adminAxios.post(
    "/admin/announcement",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
