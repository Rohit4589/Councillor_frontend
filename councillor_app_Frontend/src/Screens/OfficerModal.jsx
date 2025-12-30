import { useState } from "react";

export default function OfficerModal({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!name || !designation || !department || !phone) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      id: Date.now(),
      name,
      designation,
      department,
      phone,
    });

    // reset after save
    setName("");
    setDesignation("");
    setDepartment("");
    setPhone("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Add Officer</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Designation</label>
          <input value={designation} onChange={(e) => setDesignation(e.target.value)} />

          <label>Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} />

          <label>Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
