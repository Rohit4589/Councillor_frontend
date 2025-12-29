import { Pencil, X, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "../style/councillor.css";
import "../style/modal.css";
import { useOutletContext } from "react-router-dom";

// 🔴 BACKEND (ENABLE LATER)
import {
  getCouncillors,
  updateCouncillor,
  deleteCouncillor,
} from "../api/superAdminCouncillorApi"

export default function Councillor() {
  /* ================================
     STATE FROM LAYOUT
  ================================ */
  const { councillors, setCouncillors } = useOutletContext();

  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

 

  /* ================================
     HANDLERS
  ================================ */

  const handleEdit = (row) => {
    setSelected(row);
    setOpenEdit(true);
  };

  const handleSave = async () => {
    // 🔴 BACKEND VERSION
    /*
    const updated = await updateCouncillor(selected.id, {
      name: selected.name,
      phone: selected.phone,
      ward: selected.ward,
    });

    setCouncillors((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    */

    // ✅ TEMP UPDATE
    setCouncillors((prev) =>
      prev.map((c) => (c.id === selected.id ? selected : c))
    );

    setOpenEdit(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this councillor?"
    );

    if (!confirmDelete) return;

    // 🔴 BACKEND VERSION
    /*
    await deleteCouncillor(id);
    */

    // ✅ TEMP DELETE
    setCouncillors((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Ward Assigned</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {councillors.map((row) => (
              <Row
                key={row.id}
                data={row}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================================
         EDIT MODAL
      ================================ */}
      {openEdit && selected && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Edit Councillor</h3>
              <X onClick={() => setOpenEdit(false)} />
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                value={selected.name}
                onChange={(e) =>
                  setSelected({ ...selected, name: e.target.value })
                }
              />

              <label>Phone Number</label>
              <input
                value={selected.phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setSelected({
                    ...selected,
                    phone: numericValue.slice(0, 10),
                  });
                }}
              />

              <label>Ward</label>
              <input
                value={selected.ward}
                onChange={(e) =>
                  setSelected({ ...selected, ward: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setOpenEdit(false)}>
                Cancel
              </button>

              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================
   TABLE ROW (UNCHANGED UI)
================================ */

function Row({ data, onEdit, onDelete }) {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.phone}</td>
      <td>{data.ward}</td>
      <td>
        <span className={`status ${data.status}`}>
          {data.status === "active" ? "Active" : "Inactive"}
        </span>
      </td>
      <td style={{ textAlign: "right" }}>
        <div className="table-actions">
          <Pencil size={18} onClick={() => onEdit(data)} />
          <Trash2
            size={18}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => onDelete(data.id)}
          />
        </div>
      </td>
    </tr>
  );
}
