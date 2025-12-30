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
  const outletContext = useOutletContext();

  /* ================================
     STATE
  ================================ */
  const [categories, setCategories] = useState([]);
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
     TOPBAR PRIMARY ACTION
  ================================ */
  useEffect(() => {
    if (outletContext?.setPrimaryAction) {
      outletContext.setPrimaryAction(() => () => {
        setSelectedCategory(null);
        setName("");
        setPhone("");
        setOpenModal(true);
      });
    }

    // ✅ CLEANUP ON UNMOUNT
    return () => {
      if (outletContext?.setPrimaryAction) {
        outletContext.setPrimaryAction(null);
      }
    };
  }, [outletContext]);

  /* ================================
     HANDLERS
  ================================ */
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
      {/* TABLE */}
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

      {/* ADD / EDIT MODAL */}
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
                onChange={(e) => {
                  const numeric = e.target.value.replace(/\D/g, "");
                  if (numeric.length <= 10) setPhone(numeric);
                }}
                placeholder="9876543210"
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

      {/* DELETE MODAL */}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
