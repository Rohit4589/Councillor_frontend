import { Pencil, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import "../style/councillor.css";
import "../style/modal.css";
import { useOutletContext } from "react-router-dom";

// 🔴 BACKEND (ENABLE LATER)
// import { updateCouncillor } from "../../api/superAdminCouncillorApi";

export default function Councillor() {
  /* ================================
     STATE FROM LAYOUT
     ================================ */
  const { councillors, setCouncillors } = useOutletContext();

  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  /* ================================
     FETCH (NOT USED – STATIC MODE)
     ================================ */
  useEffect(() => {
    /*
    fetch("http://localhost:5000/api/councillors")
      .then(res => res.json())
      .then(data => setCouncillors(data))
      .catch(err => console.error(err));
    */
  }, []);

  /* ================================
     HANDLERS
     ================================ */

  const handleEdit = (row) => {
    setSelected(row);
    setOpenEdit(true);
  };

  const handleSave = () => {
    // 🔴 BACKEND VERSION (ENABLE LATER)
    /*
    await updateCouncillor(selected.id, selected);
    */

    // ✅ STATIC UPDATE
    setCouncillors((prev) =>
      prev.map((item) => (item.id === selected.id ? selected : item))
    );

    setOpenEdit(false);
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
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {councillors.map((row) => (
              <Row key={row.id} data={row} onEdit={handleEdit} />
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
                onChange={(e) =>
                  setSelected({ ...selected, phone: e.target.value })
                }
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
   TABLE ROW
   ================================ */
function Row({ data, onEdit }) {
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
        </div>
      </td>
    </tr>
  );
}
