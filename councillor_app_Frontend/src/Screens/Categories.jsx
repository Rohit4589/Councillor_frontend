import "../Style/categories.css";
import { Pencil, Trash2, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useOutletContext } from "react-router-dom";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";

export default function Categories() {
  const { newCategory, clearNewCategory } = useOutletContext();

  /* ================================
     STATE
  ================================ */
  const [categories, setCategories] = useState([
  {
    id: 101,
    name: "Street Lights",
    count: 156,
    phone: "9588343566",
  },
  {
    id: 102,
    name: "Roads & Potholes",
    count: 234,
    phone: "9588343566",
  },
  {
    id: 103,
    name: "Garbage Collection",
    count: 189,
    phone: "9588343566",
  },
  {
    id: 104,
    name: "Water Supply",
    count: 98,
    phone: "9588343566",
  },
  {
    id: 105,
    name: "Street Cleaning",
    count: 112,
    phone: "9588343566",
  },
]);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /* ================================
     FETCH CATEGORIES
  ================================ */
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() =>
        console.warn("Backend not ready, using empty categories")
      );
  }, []);

  /* ================================
     ADD FROM TOP BAR
  ================================ */
  useEffect(() => {
    if (newCategory) {
      const tempId = Date.now();

      setCategories((prev) => [
        ...prev,
        { id: tempId, name: newCategory.name, phone: newCategory.phone, count: 0 },
      ]);

      addCategory(newCategory).catch(console.error);
      clearNewCategory();
    }
  }, [newCategory, clearNewCategory]);

  /* ================================
     HANDLERS
  ================================ */
  const openAdd = () => {
    setSelectedCategory(null);
    setName("");
    setPhone("");
    setOpenModal(true);
  };

  const openEdit = (cat) => {
    setSelectedCategory(cat);
    setName(cat.name);
    setPhone(cat.phone);
    setOpenModal(true);
  };

  const saveCategory = async () => {
    if (!name || !phone) return;

    // ADD
    if (!selectedCategory) {
      const tempId = Date.now();
      setCategories((prev) => [
        ...prev,
        { id: tempId, name, phone, count: 0 },
      ]);

      try {
        await addCategory({ name, phone });
      } catch (e) {
        console.error(e);
      }
    }
    // EDIT
    else {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory.id ? { ...c, name, phone } : c
        )
      );

      try {
        await updateCategory(selectedCategory.id, { name, phone });
      } catch (e) {
        console.error(e);
      }
    }

    setOpenModal(false);
  };

  const confirmDelete = async () => {
    const id = selectedCategory.id;
    setCategories((prev) => prev.filter((c) => c.id !== id));

    try {
      await deleteCategory(id);
    } catch (e) {
      console.error(e);
    }

    setOpenDelete(false);
    setSelectedCategory(null);
  };

  /* ================================
     UI
  ================================ */
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
                    onClick={() => openEdit(cat)}
                  />
                  <Trash2
                    size={18}
                    className="delete"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenDelete(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== ADD / EDIT MODAL ===== */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{selectedCategory ? "Edit Category" : "Add Category"}</h3>
              <X className="close-icon" onClick={() => setOpenModal(false)} />
            </div>

            <div className="modal-body">
              <label>Category Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Street Lights"
              />

              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
              />
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button className="btn-save" onClick={saveCategory}>
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE MODAL ===== */}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
