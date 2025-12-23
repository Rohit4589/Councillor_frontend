import { Pencil, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import "../Style/councillor.css";
import "../Style/modal.css";

export default function Councillor() {

  /* ================================
     STATE (STATIC FOR NOW)
     ================================ */

  const [councillors, setCouncillors] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      phone: "+91 9876543210",
      ward: "Ward 15",
      status: "active",
      city: "Pune",
    },
    {
      id: 2,
      name: "Priya Desai",
      phone: "+91 9876543211",
      ward: "Ward 12",
      status: "active",
      city: "Pune",
    },
    {
      id: 3,
      name: "Amit Kumar",
      phone: "+91 9876543212",
      ward: "Ward 8",
      status: "active",
      city: "Pune",
    },
    {
      id: 4,
      name: "Sneha Patel",
      phone: "+91 9876543213",
      ward: "Ward 22",
      status: "active",
      city: "Pune",
    },
    {
      id: 5,
      name: "Vijay Singh",
      phone: "+91 9876543214",
      ward: "Ward 5",
      status: "inactive",
      city: "Pune",
    },
  ]);

  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  /* ================================
     API FETCH (ENABLE LATER)
     ================================ */

  useEffect(() => {

    /*
    🔴 WHEN API IS READY
    -------------------
    fetch("http://localhost:5000/api/councillors")
      .then(res => res.json())
      .then(data => setCouncillors(data))
      .catch(err => console.error("Councillor API Error:", err));
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

    /*
    🔴 API VERSION (PASTE LATER)
    ---------------------------
    fetch(`/api/councillors/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected)
    });
    */

    // STATIC UPDATE
    setCouncillors((prev) =>
      prev.map((item) =>
        item.id === selected.id ? selected : item
      )
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
              <Row
                key={row.id}
                data={row}
                onEdit={handleEdit}
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

              <label>City</label>
              <input
                value={selected.city}
                onChange={(e) =>
                  setSelected({ ...selected, city: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setOpenEdit(false)}
              >
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
