import "../Style/categories.css";
import { Pencil, Trash2, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import DeleteConfirmModal from "./DeleteConfirmModal";
import { getCategoryOfficers } from "../api/categoriesApi";
import CategoryModal from "./CategoryModal";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoriesApi";

export default function Categories() {
  // const { newCategory, clearNewCategory } = useOutletContext();
  const [loading, setLoading] = useState(true);

  /* ================================
     STATE
  ================================ */
  const [categories, setCategories] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false); // ADD
  const [openEditModal, setOpenEditModal] = useState(false); // EDIT

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openOfficersModal, setOpenOfficersModal] = useState(false);
  const [selectedOfficers, setSelectedOfficers] = useState([]);
  // const res = await getCategoryOfficers(cat.id);
  // setSelectedOfficers(res.officers);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   if (!newCategory) return;

  //   const tempId = Date.now();

  //   setCategories((prev) => [
  //     ...prev,
  //     {
  //       id: tempId,
  //       name: newCategory.name,
  //       phone: newCategory.phone,
  //       count: 0,
  //     },
  //   ]);

  //   addCategory(newCategory).catch(console.error);
  //   clearNewCategory();
  // }, [newCategory]);

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

  // const openAddCategory = () => {
  //   setOpenAddModal(true);
  // };

  useEffect(() => {
    const handler = () => setOpenAddModal(true);
    window.addEventListener("open-add-category", handler);

    return () => {
      window.removeEventListener("open-add-category", handler);
    };
  }, []);

  const handleAddCategory = async ({ name, phone }) => {
    try {
      await addCategory({ name, phone });
      await fetchCategories();
    } catch (err) {
      console.error("Add category failed:", err);
    } finally {
      setOpenAddModal(false);
    }
  };

  const openEdit = (cat) => {
    setOpenAddModal(false);
    setSelectedCategory(cat);
    setName(cat.name);
    setPhone(cat.phone);
    setOpenEditModal(true);
  };

  const saveEditedCategory = async () => {
    if (!name || !phone || !selectedCategory) return;

    try {
      await updateCategory(selectedCategory.id, { name, phone });
      await fetchCategories();
    } catch (err) {
      console.error("Edit category failed:", err);
    } finally {
      setOpenEditModal(false);
      setSelectedCategory(null);
      setName("");
      setPhone("");
    }
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      await deleteCategory(selectedCategory.id);

      // 🔥 re-fetch after backend success
      await fetchCategories();
    } catch (err) {
      console.error("Delete category failed:", err);
    } finally {
      setOpenDelete(false);
      setSelectedCategory(null);
    }
  };

  /* ================================
     UI
  ================================ */
  return (
    <>
      {openAddModal && (
        <CategoryModal
          open={openAddModal}
          mode="add"
          onClose={() => setOpenAddModal(false)}
          onSave={handleAddCategory}
        />
      )}

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
              <th>Category Phone</th> 
              <th>Total Complaints</th>
              <th>Officers Assigned</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td data-label="Category Name">{cat.name}</td>
                <td data-label="Category Phone">{cat.phone || "-"}</td>
                <td data-label="Total Complaints">{cat.count}</td>
                <td
                  data-label="Officers Assigned"
                  className="officers-link"
                  onClick={async () => {
                    setSelectedCategory(cat);
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

      {/*/ EDIT MODAL */}
      {openEditModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{selectedCategory ? "Edit Category" : "Add Category"}</h3>
              <X
                className="close-icon"
                onClick={() => setOpenEditModal(false)}
              />
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
                onClick={() => setOpenEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={saveEditedCategory}>
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

            <div className="modal-body">
              {/* CATEGORY CONTACT */}
              <div style={{ marginBottom: "12px" }}>
                <strong>Officer Name</strong>
                <div>
                  {selectedOfficers.length > 0
                    ? selectedOfficers[0]?.name || "-"
                    : "-"}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong>Officer Phone</strong>
                <div>
                  {selectedOfficers.length > 0
                    ? selectedOfficers[0]?.phone || "-"
                    : "-"}
                </div>
              </div>
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
