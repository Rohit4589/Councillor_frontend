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

  const [categories, setCategories] = useState([
    { id: 101, name: "Street Lights", count: 156, phone: "9588343566" },
    { id: 102, name: "Roads & Potholes", count: 234, phone: "9588343566" },
    { id: 103, name: "Garbage Collection", count: 189, phone: "9588343566" },
    { id: 104, name: "Water Supply", count: 98, phone: "9588343566" },
    { id: 105, name: "Street Cleaning", count: 112, phone: "9588343566" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => console.warn("Backend not ready, using empty categories"));
  }, []);

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

      addCategory(newCategory).catch(console.error);
      clearNewCategory();
    }
  }, [newCategory, clearNewCategory]);

  const openEdit = (cat) => {
    setSelectedCategory(cat);
    setName(cat.name);
    setPhone(cat.phone);
    setOpenModal(true);
  };

  const saveCategory = async () => {
    if (!name || !phone) return;

    if (!selectedCategory) {
      const tempId = Date.now();
      setCategories((prev) => [...prev, { id: tempId, name, phone, count: 0 }]);
      await addCategory({ name, phone });
    } else {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory.id ? { ...c, name, phone } : c
        )
      );
      await updateCategory(selectedCategory.id, { name, phone });
    }

    setOpenModal(false);
  };

  const confirmDelete = async () => {
    const id = selectedCategory.id;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    await deleteCategory(id);
    setOpenDelete(false);
    setSelectedCategory(null);
  };

  return (
    <>
      {/* ===== TABLE ===== */}
      <div className="categories-table">
        <table className="categories-data-table">
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
                <td data-label="Category Name">{cat.name}</td>

                <td data-label="Total Complaints">{cat.count}</td>

                <td data-label="Phone Number">{cat.phone}</td>

                <td data-label="Actions" className="actions-cell">
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
              <input value={name} onChange={(e) => setName(e.target.value)} />

              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  if (v.length <= 10) setPhone(v);
                }}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={saveCategory}>
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
