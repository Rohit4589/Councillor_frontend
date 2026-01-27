import "../Style/categories.css";
import { Pencil, Trash2, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import DeleteConfirmModal from "./DeleteConfirmModal";
import { getCategoryOfficers } from "../api/categoriesApi";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";

export default function Categories() {
  const { newCategory, clearNewCategory } = useOutletContext();
  const [loading, setLoading] = useState(true);


  /* ================================
     STATE
  ================================ */
const [categories, setCategories] = useState([]);


  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openOfficersModal, setOpenOfficersModal] = useState(false);
  const [selectedOfficers, setSelectedOfficers] = useState([]);
  // const res = await getCategoryOfficers(cat.id);
  // setSelectedOfficers(res.officers);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");


  /* ================================
     FETCH CATEGORIES
  ================================ */
 useEffect(() => {
   getCategories()
     .then(setCategories)
     .catch((err) => {
       console.error("Failed to load categories:", err);
     })
     .finally(() => {
       setLoading(false);
     });
 }, []);

  useEffect(() => {
    if (!newCategory) return;

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
  }, [newCategory]);

  /* ================================
     TOPBAR PRIMARY ACTION
  ================================ */
  // useEffect(() => {
  //   if (!outletContext?.setPrimaryAction) return;

  //   outletContext.setPrimaryAction(() => () => {
  //     setSelectedCategory(null);
  //     setName("");
  //     setPhone("");
  //     setOpenModal(true);
  //   });

  //   return () => outletContext.setPrimaryAction(null);
  // }, [outletContext]);

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

  /* ================================
     UI
  ================================ */
  return (
    <>
      {/* TABLE */}
      <div className="categories-table">
        {loading && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            Loading categories...
          </div>
        )}

        <table className="categories-data-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Total Complaints</th>
              <th>Officers Assigned</th>

              <th className="actions-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td data-label="Category Name">{cat.name}</td>
                <td data-label="Total Complaints">{cat.count}</td>
                <td
                  data-label="Officers Assigned"
                  className="officers-link"
                  onClick={async () => {
                    setOpenOfficersModal(true);

                    const res = await getCategoryOfficers(cat.id);
                    setSelectedOfficers(res.officers || []);
                  }}
                >
                  View Officers
                </td>

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
              <input value={name} onChange={(e) => setName(e.target.value)} />

              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => {
                  const numeric = e.target.value.replace(/\D/g, "");
                  if (numeric.length <= 10) setPhone(numeric);
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

      {/* DELETE MODAL */}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
      {openOfficersModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Officers Assigned</h3>
              <X
                className="close-icon"
                onClick={() => setOpenOfficersModal(false)}
              />
            </div>

            {/* officers assigned MODAL */}

            <div className="modal-body">
              {selectedOfficers.length === 0 ? (
                <p>No officers assigned to this category.</p>
              ) : (
                selectedOfficers.map((officer, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <strong>{officer.name}</strong>
                    <div>{officer.phone}</div>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setOpenOfficersModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
