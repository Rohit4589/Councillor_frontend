// src/Layout/TopNavbar.jsx
import {
  useLocation,
  useNavigate,
  useParams,
  matchPath,
} from "react-router-dom";
import { routesConfig } from "../Navigation/routes";
import { Search, ArrowLeft } from "lucide-react";
import "../Style/topbar.css";

export default function TopNavbar({ searchValue, onSearchChange, onSortClick, onFilterClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const routes = Object.values(routesConfig).sort(
    (a, b) => b.path.length - a.path.length
  );

  const currentRoute =
    routes.find((route) =>
      matchPath({ path: route.path, end: false }, location.pathname)
    ) || routesConfig.dashboard;

  let title = currentRoute.title;
  let subtitle = currentRoute.subtitle;
  const actions = currentRoute.topbarActions;

  const isComplaintDetails = currentRoute.key === "complaintDetails";

  if (isComplaintDetails && params.id) {
    title = "Complaint Details";
    subtitle = params.id;
  }

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        {isComplaintDetails && (
          <button className="back-btn" onClick={() => navigate("/complaints")}>
            <ArrowLeft size={18} />
          </button>
        )}

        <div>
          <h1 className="topbar-title">{title}</h1>
          {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* RIGHT */}
      {actions && (
        <div className="topbar-actions">
          {actions.search && (
            <div className="topbar-search">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={actions.searchPlaceholder}
              />
            </div>
          )}

          {actions.sort && (
            <button
              type="button"
              className="topbar-btn"
              onClick={() => {
                console.log("SORT CLICKED");
                onSortClick && onSortClick();
              }}
            >
              Sort
            </button>
          )}

          {actions.filter && (
            <button
              type="button"
              className="topbar-btn"
              onClick={() => {
                console.log("FILTER CLICKED");
                onFilterClick && onFilterClick();
              }}
            >
              Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
