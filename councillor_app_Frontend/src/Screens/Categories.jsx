import "../Style/categories.css";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryModal from "./CategoryModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function Categories() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "Street Lights", count: 156, phone: "95883 43566" },
    { name: "Roads & Potholes", count: 234, phone: "95883 43566" },
    { name: "Garbage Collection", count: 189, phone: "95883 43566" },
    { name: "Water Supply", count: 98, phone: "95883 43566" },
     { name: "Parks & Gardens", count: 67, phone: "95883 43566" },
  { name: "Public Toilets", count: 54, phone: "95883 43566" },
  { name: "Street Cleaning", count: 112, phone: "95883 43566" },
  { name: "Traffic Signals", count: 39, phone: "95883 43566" },
 
  ];

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setOpenEdit(true);
  };

  const handleDelete = (cat) => {
    setSelectedCategory(cat);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    console.log("Deleted:", selectedCategory);
    setOpenDelete(false);
  };

  return (
    <>
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
              <tr key={cat.name}>
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

      {/* Edit Modal */}
      <CategoryModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        mode="edit"
        data={selectedCategory}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
