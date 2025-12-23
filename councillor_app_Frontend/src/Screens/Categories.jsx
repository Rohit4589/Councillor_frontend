import "../Style/categories.css";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useOutletContext } from "react-router-dom";
export default function Categories() {

  /* ================================
     STATE (STATIC FOR NOW)
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
     API FETCH (ENABLE LATER)
     ================================ */

  useEffect(() => {

    /*
    🔴 WHEN API IS READY
    -------------------
    1. Uncomment this block
    2. Paste API URL
    */

    /*
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Categories API Error:", err));
    */

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

  const handleSaveCategory = (data) => {

    // ================= ADD =================
    if (!selectedCategory) {
      /*
      🔴 API VERSION (PASTE LATER)
      fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      */

      setCategories(prev => [
        ...prev,
        {
          id: Date.now(),
          name: data.name,
          phone: data.phone,
          count: 0
        }
      ]);
    }

    // ================= EDIT =================
    else {
      /*
      🔴 API VERSION (PASTE LATER)
      fetch(`/api/categories/${selectedCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      */

      setCategories(prev =>
        prev.map(item =>
          item.id === selectedCategory.id
            ? { ...item, ...data }
            : item
        )
      );
    }

    // setOpenAdd(false);
    setOpenEdit(false);
  };

  const confirmDelete = () => {

    /*
    🔴 API VERSION (PASTE LATER)
    fetch(`/api/categories/${selectedCategory.id}`, {
      method: "DELETE"
    });
    */

    setCategories(prev =>
      prev.filter(item => item.id !== selectedCategory.id)
    );

    setOpenDelete(false);
  };

  useEffect(() => {
    if (newCategory) {
      setCategories((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newCategory.name,
          phone: newCategory.phone,
          count: 0,
        },
      ]);

      clearNewCategory(); // prevent duplicate insert
    }
  }, [newCategory, clearNewCategory]);


  return (
    <>
      {/* ===== ADD BUTTON ===== */}
      {/* <div className="categories-header">
        <button className="add-category-btn" onClick={handleAdd}>
          + Add Category
        </button>
      </div> */}

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
            {categories.map(cat => (
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

      {/* ===== ADD MODAL ===== */}
      {/* <CategoryModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleSaveCategory}
        mode="add"
      /> */}

      {/* ===== EDIT MODAL ===== */}
      <CategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleSaveCategory}
        mode="edit"
        data={selectedCategory}
      />

      {/* ===== DELETE MODAL ===== */}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
