import { Pencil, X, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import "../style/councillor.css";
import "../style/modal.css";
import { useOutletContext } from "react-router-dom";

export default function Councillor() {
  const { councillors, setCouncillors } = useOutletContext();

  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleEdit = (row) => {
    setSelected(row);
    setOpenEdit(true);
  };

  const handleSave = () => {
    setCouncillors((prev) =>
      prev.map((c) => (c.id === selected.id ? selected : c))
    );
    setOpenEdit(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this councillor?"))
      return;

    setCouncillors((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="dashboard-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Ward</th>
              <th>City</th>
              <th>Municipal Corporation</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {councillors.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.ward}</td>
                <td>{row.city}</td>
                <td>{row.corporation}</td>
                <td>
                  <span className={`status ${row.status}`}>
                    {row.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Pencil size={18} onClick={() => handleEdit(row)} />
                  <Trash2
                    size={18}
                    style={{ marginLeft: 10 }}
                    onClick={() => handleDelete(row.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
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

              <label>Phone</label>
              <input
                value={selected.phone}
                onChange={(e) => {
                  const num = e.target.value.replace(/\D/g, "");
                  setSelected({ ...selected, phone: num.slice(0, 10) });
                }}
              />

              <label>Ward</label>
              <input
                value={selected.ward}
                onChange={(e) =>
                  setSelected({ ...selected, ward: e.target.value })
                }
              />

              <label>City</label>
              <input
                value={selected.city}
                onChange={(e) =>
                  setSelected({ ...selected, city: e.target.value })
                }
              />

              <label>Municipal Corporation</label>
              <input
                value={selected.corporation}
                onChange={(e) =>
                  setSelected({ ...selected, corporation: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setOpenEdit(false)}>
                Cancel
              </button>

              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= TABLE ROW ================= */

function Row({ data, onEdit, onDelete }) {
  return (
    <tr>
      <td data-label="Name">{data.name}</td>

      <td data-label="Phone Number">{data.phone}</td>

      <td data-label="Ward Assigned">{data.ward}</td>

      <td data-label="Status">
        <span className={`status ${data.status}`}>
          {data.status === "active" ? "Active" : "Inactive"}
        </span>
      </td>

      <td data-label="Actions">
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
