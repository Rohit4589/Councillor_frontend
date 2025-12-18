import { useLocation } from "react-router-dom";
import { routesConfig } from "../Navigation/routes";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddCategoryModal from "../Screens/AddCategoryModal";
import "../Style/topbar.css";

export default function TopNavbar() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  const currentRoute =
    Object.values(routesConfig).find((route) =>
      location.pathname.startsWith(route.path)
    ) || routesConfig.dashboard;

  return (
    <>
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

      {/* Modal */}
      <AddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
