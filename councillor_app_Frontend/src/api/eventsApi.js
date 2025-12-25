// src/api/eventsApi.js

const BASE_URL = "http://localhost:5000/api/admin";

/* ===============================
   GET EVENT CATEGORIES
   =============================== */
export const getEventCategories = async () => {
  const res = await fetch(`${BASE_URL}/category`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const json = await res.json();

  return json.data.map((item) => ({
    id: item.category_id,
    name: item.category_name,
  }));
};

/* ===============================
   CREATE EVENT (DOC COMPLIANT)
   =============================== */
export const createEvent = async ({
  event_name,
  category_id,
  description,
  photos,
}) => {
  const formData = new FormData();

  formData.append("event_name", event_name);
  formData.append("category_id", category_id);
  formData.append("description", description);

  photos.forEach((file) => {
    formData.append("photos[]", file);
  });

  const res = await fetch(`${BASE_URL}/announcement`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Create event failed");

  return res.json();
};
