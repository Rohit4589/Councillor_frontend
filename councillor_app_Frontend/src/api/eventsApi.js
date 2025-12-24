// src/api/eventsApi.js

const BASE_URL = "http://localhost:5000/api";

/* ===============================
   GET EVENT CATEGORIES
   =============================== */
export const getEventCategories = async () => {
  const res = await fetch(`${BASE_URL}/event-categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch event categories");
  }

  const data = await res.json();

  // normalize response
  return data.map((item) => ({
    id: item.id || item._id,
    name: item.name,
  }));
};

/* ===============================
   CREATE EVENT (WITH PHOTOS)
   =============================== */
export const createEvent = async ({
  eventName,
  category,
  description,
  photos,
}) => {
  const formData = new FormData();

  formData.append("eventName", eventName);
  formData.append("category", category);
  formData.append("description", description);

  photos.forEach((photo) => {
    formData.append("photos", photo);
  });

  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  return res.json();
};
