import "../Style/officers.css";
import "../Style/officermodal.css";
import { useEffect, useState } from "react";
import { getOfficers, addOfficer } from "../api/officersApi";
import { useOutletContext } from "react-router-dom";

export default function Officers() {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* MODAL STATE */
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  const outletContext = useOutletContext();

  /* ===============================
     TOPBAR "+ Add Officer" BUTTON
  ================================ */
  useEffect(() => {
    outletContext?.setPrimaryAction?.(() => () => {
      setShowAddModal(true);
    });

    return () => {
      outletContext?.setPrimaryAction?.(null);
    };
  }, [outletContext]);

  /* ===============================
     FETCH OFFICERS
  ================================ */
  useEffect(() => {
    getOfficers()
      .then(setOfficers)
      .finally(() => setLoading(false));
  }, []);

  /* ===============================
     SAVE OFFICER
  ================================ */
  const handleSave = async () => {
    if (!name || !designation || !department || !phone) {
      alert("Please fill all fields");
      return;
    }

    const payload = { name, designation, department, phone };

    const savedOfficer = await addOfficer(payload);

    // ✅ ADD AS FIRST ROW
    setOfficers((prev) => [savedOfficer, ...prev]);

    // RESET
    setShowAddModal(false);
    setName("");
    setDesignation("");
    setDepartment("");
    setPhone("");
  };

  if (loading) return <p style={{ padding: 20 }}>Loading officers...</p>;

  return (
    <>
      {/* ===== TABLE ===== */}
      <div className="officers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th className="phone-col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.designation}</td>
                <td>{o.department}</td>
                <td className="phone-col">{o.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== ADD OFFICER MODAL ===== */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add Officer</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter officer name"
              />

              <label>Designation</label>
              <input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Enter designation"
              />

              <label>Department</label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter department"
              />

              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="modal-actions">
              <button
                className="ghost"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
