const BASE_URL = "http://localhost:5000/api/categories";

export const getCategories = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Fetch failed");

  const data = await res.json();

  return data.map((item) => ({
    id: item.id || item.categoryId || item._id,
    name: item.name,
    phone: item.phone,
    count: item.count ?? 0,
  }));
};

export const addCategory = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Add failed");
  return res.json();
};

export const updateCategory = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");
};
