import "../Style/categories.css";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useOutletContext } from "react-router-dom";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";

export default function Categories() {
  /* ================================
     STATE (STATIC FALLBACK)
     ================================ */
  const { newCategory, clearNewCategory } = useOutletContext();

  const [categories, setCategories] = useState([
    { id: 1, name: "Street Lights", count: 156, phone: "95883 43566" },
    { id: 2, name: "Roads & Potholes", count: 234, phone: "95883 43566" },
    { id: 3, name: "Garbage Collection", count: 189, phone: "95883 43566" },
    { id: 4, name: "Water Supply", count: 98, phone: "95883 43566" },
    { id: 5, name: "Parks & Gardens", count: 67, phone: "95883 43566" },
    { id: 6, name: "Public Toilets", count: 54, phone: "95883 43566" },
    { id: 7, name: "Street Cleaning", count: 112, phone: "95883 43566" },
    { id: 8, name: "Traffic Signals", count: 39, phone: "95883 43566" },
  ]);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* ================================
     FETCH FROM BACKEND (SAFE)
     ================================ */
  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => console.warn("Backend not ready, using static categories"));
  }, []);

  /* ================================
     HANDLERS
     ================================ */
  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setOpenEdit(true);
  };

  const handleDelete = (cat) => {
    setSelectedCategory(cat);
    setOpenDelete(true);
  };

  const handleSaveCategory = async (data) => {
    // ================= ADD =================
    if (!selectedCategory) {
      const tempId = Date.now();

      // optimistic UI (same as old static logic)
      setCategories((prev) => [
        ...prev,
        {
          id: tempId,
          name: data.name,
          phone: data.phone,
          count: 0,
        },
      ]);

      try {
        await addCategory(data);
      } catch (err) {
        console.error("Add Category API Error:", err);
      }
    }

    // ================= EDIT =================
    else {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === selectedCategory.id ? { ...item, ...data } : item
        )
      );

      try {
        await updateCategory(selectedCategory.id, data);
      } catch (err) {
        console.error("Update Category API Error:", err);
      }
    }

    setOpenEdit(false);
    setSelectedCategory(null);
  };

  const confirmDelete = async () => {
    const id = selectedCategory.id;

    setCategories((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteCategory(id);
    } catch (err) {
      console.error("Delete Category API Error:", err);
    }

    setOpenDelete(false);
    setSelectedCategory(null);
  };

  /* ================================
     ADD FROM TOP BAR (UNCHANGED FLOW)
     ================================ */
  useEffect(() => {
    if (newCategory) {
      const tempId = Date.now();

      setCategories((prev) => [
        ...prev,
        {
          id: tempId,
          name: newCategory.name,
          phone: newCategory.phone,
          count: 0,
        },
      ]);

      // backend sync
      addCategory(newCategory).catch((err) =>
        console.error("Add Category API Error:", err)
      );

      clearNewCategory();
    }
  }, [newCategory, clearNewCategory]);

  return (
    <>
      {/* ===== TABLE ===== */}
      <div className="categories-table">
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Total Complaints</th>
              <th>Phone Number</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.name}</td>
                <td>{cat.count}</td>
                <td>{cat.phone}</td>
                <td className="actions-cell">
                  <Pencil
                    size={18}
                    className="edit"
                    onClick={() => handleEdit(cat)}
                  />
                  <Trash2
                    size={18}
                    className="delete"
                    onClick={() => handleDelete(cat)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== EDIT MODAL (UNCHANGED) ===== */}
      <CategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleSaveCategory}
        mode="edit"
        data={selectedCategory}
      />

      {/* ===== DELETE MODAL (UNCHANGED) ===== */}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
