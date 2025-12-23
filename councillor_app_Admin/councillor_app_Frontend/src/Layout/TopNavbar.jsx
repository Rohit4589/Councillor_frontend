import { useLocation } from "react-router-dom";
import { routesConfig } from "../Navigation/routes";
import { Plus, X } from "lucide-react";
import { useState } from "react";

import "../Style/topbar.css";
import "../Style/modal.css";

export default function TopNavbar() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  /* ================================
     FORM STATE (STATIC FOR NOW)
     ================================ */

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState("");
  const [city, setCity] = useState("");

  const currentRoute =
    Object.values(routesConfig).find((route) =>
      location.pathname.startsWith(route.path)
    ) || routesConfig.dashboard;

  /* ================================
     HANDLERS
     ================================ */

  const resetForm = () => {
    setName("");
    setPhone("");
    setWard("");
    setCity("");
  };

  const handleCreate = () => {
    const payload = {
      name,
      phone,
      ward,
      city,
      status: "active",
    };

    console.log("NEW COUNCILLOR:", payload);

    /*
    🔴 API VERSION (PASTE LATER)
    ---------------------------
    fetch("http://localhost:5000/api/councillors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    */

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
                onChange={(e) => setPhone(e.target.value)}
              />

              <label>Ward</label>
              <input
                type="text"
                placeholder="Ward 12"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />

              <label>City</label>
              <input
                type="text"
                placeholder="Pune"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
