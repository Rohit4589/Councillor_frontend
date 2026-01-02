// src/api/eventsApi.js
import axiosInstance from "./axiosInstance";

/* ===============================
   GET EVENT CATEGORIES
================================ */
export const getEventCategories = async () => {
  const response = await axiosInstance.get(
    "/api/admin/category"
  );

  return response.data.data.map((item) => ({
    id: item.category_id,
    name: item.category_name,
  }));
};

/* ===============================
   CREATE EVENT
================================ */
export const createEvent = async ({
  event_name,
  category_id,
  description,
  photos,
  video,
}) => {
  const formData = new FormData();

  formData.append("event_name", event_name);
  formData.append("category_id", category_id);
  formData.append("description", description);

  photos.forEach((file) => {
    formData.append("photos[]", file);
  });

  if (video) {
    formData.append("video", video);
  }

  const response = await axiosInstance.post(
    "/api/admin/announcement",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
