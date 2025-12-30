import { useLocation } from "react-router-dom";
import { superAdminRoutesConfig } from "../routes/superAdminRoutesConfig";
import { Plus, X } from "lucide-react";
import { Menu } from "lucide-react";
import { useState } from "react";

import "../Style/topbar.css";
import "../Style/modal.css";

export default function SuperTopNavbar({ onCreate,setSidebarOpen }) {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);


  /* ================================
     FORM STATE
  ================================ */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState("");
  const [city, setCity] = useState("");
  const [corporation, setCorporation] = useState("");

  const currentRoute = Object.values(superAdminRoutesConfig).find((route) =>
    location.pathname.startsWith(route.path)
  );

  const resetForm = () => {
    setName("");
    setPhone("");
    setWard("");
    setCity("");
    setCorporation("");
  };

  const handleCreate = () => {
    onCreate({
      name,
      phone,
      ward,
      city,
      corporation,
    });

    resetForm();
    setOpenModal(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-content">
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

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

      {/* ADD COUNCILLOR MODAL */}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />

              <label>Ward</label>
              <input
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />

              <label>City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label>Municipal Corporation</label>
              <input
                value={corporation}
                onChange={(e) => setCorporation(e.target.value)}
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
