import axiosInstance from "./axiosInstance";

/* ===============================
   GET EVENT CATEGORIES (ADMIN)
   API: GET /admin/category
================================ */
export const getEventCategories = async () => {
  const response = await axiosInstance.get("/api/admin/category");

  return response.data.data.map((item) => ({
    id: item.category_id,
    name: item.category_name,
  }));
};

/* ===============================
   CREATE ANNOUNCEMENT / EVENT
   API: POST /admin/announcement
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

  // 🔍 DEBUG: log FormData
for (let [key, value] of formData.entries()) {
  if (value instanceof File) {
    console.log(key, {
      name: value.name,
      type: value.type,
      size: value.size,
    });
  } else {
    console.log(key, value);
  }
}

  // REQUIRED FIELDS
  formData.append("event_name", event_name);
  formData.append("category_id", Number(category_id));
  formData.append("description", description);

  // PHOTOS (0–5)
  photos.forEach((file) => {
    formData.append("photos[]", file);
  });

  // VIDEO (OPTIONAL)
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


