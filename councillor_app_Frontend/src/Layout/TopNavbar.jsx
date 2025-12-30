// src/Layout/TopNavbar.jsx
import {
  useLocation,
  useNavigate,
  useParams,
  matchPath,
} from "react-router-dom";
import { routesConfig } from "../Navigation/routes";
import { ArrowLeft } from "lucide-react";
import "../Style/topbar.css";

export default function TopNavbar({
  searchValue,
  onSearchChange,
  onSortClick,
  onFilterClick,
  onPrimaryAction,
}) {
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

  const primaryAction = currentRoute.action;
  const actions = currentRoute.topbarActions;

  let title = currentRoute.title;
  let subtitle = currentRoute.subtitle;

  const isComplaintDetails = currentRoute.key === "complaintDetails";

  if (isComplaintDetails && params.id) {
    title = "Complaint Details";
    subtitle = params.id;
  }

  return (
   <div
  className={`topbar ${
    currentRoute.path === "/categories"
      ? "topbar--categories"
      : currentRoute.path === "/officers"
      ? "topbar--officers"
      : ""
  }`}
>

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
      <div className="topbar-right">
        {/* Search / Sort / Filter */}
        <div className="topbar-actions">
          {actions?.search && (
            <div className="topbar-search">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={actions.searchPlaceholder}
              />
            </div>
          )}

          {actions?.sort && (
            <button className="topbar-btn" onClick={onSortClick}>
              Sort
            </button>
          )}

          {actions?.filter && (
            <button className="topbar-btn" onClick={onFilterClick}>
              Filter
            </button>
          )}
        </div>

        {/* PRIMARY ACTION (EXTREME RIGHT) */}
        {primaryAction && (
          <button className="topbar-primary-btn" onClick={onPrimaryAction}>
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
