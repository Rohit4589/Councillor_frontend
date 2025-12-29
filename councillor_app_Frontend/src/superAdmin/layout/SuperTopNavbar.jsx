import { useLocation } from "react-router-dom";
import { superAdminRoutesConfig } from "../routes/superAdminRoutesConfig";
import { Plus, X } from "lucide-react";
import { useState } from "react";

import "../Style/topbar.css";
import "../Style/modal.css";

export default function SuperTopNavbar({ onCreate }) {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  /* ================================
     FORM STATE
  ================================ */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState("");

  const currentRoute = Object.values(superAdminRoutesConfig).find((route) =>
    location.pathname.startsWith(route.path)
  );

  /* ================================
     HANDLERS
  ================================ */

  const resetForm = () => {
    setName("");
    setPhone("");
    setWard("");
  };

  const handleCreate = () => {
    const payload = {
      name,
      phone,
      ward,
    };

    // ✅ Pass data to layout (static OR backend handled there)
    onCreate(payload);

    resetForm();
    setOpenModal(false);
  };

  return (
    <>
      {/* ================================
         TOP BAR
      ================================ */}
      <div className="topbar">
        <div className="topbar-content">
          <div>
            <h1 className="topbar-title">{currentRoute.title}</h1>
            <p className="topbar-subtitle">{currentRoute.subtitle}</p>
          </div>

          {currentRoute.action && (
            <button
              className="topbar-action-btn"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={18} />
              {currentRoute.action.label}
            </button>
          )}
        </div>
      </div>

      {/* ================================
         ADD COUNCILLOR MODAL
      ================================ */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add Councillor</h3>
              <X onClick={() => setOpenModal(false)} />
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                type="text"
                placeholder="Ram"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Phone Number</label>
              <input
                type="text"
                placeholder="7548984763"
                value={phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setPhone(numericValue.slice(0, 10));
                }}
              />

              <label>Ward</label>
              <input
                type="text"
                placeholder="Ward 12"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => {
                  resetForm();
                  setOpenModal(false);
                }}
              >
                Cancel
              </button>

              <button className="btn-primary" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
