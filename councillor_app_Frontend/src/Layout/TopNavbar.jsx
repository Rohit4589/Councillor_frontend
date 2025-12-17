import { useLocation } from "react-router-dom";
import { routesConfig } from "../Navigation/routes";
import "../Style/topbar.css";

export default function TopNavbar() {
  const location = useLocation();

  // Find matching route config
  const currentRoute =
    Object.values(routesConfig).find(
      (route) => route.path === location.pathname
    ) || routesConfig.dashboard;

  return (
    <div className="topbar">
      <h1 className="topbar-title">{currentRoute.title}</h1>
      <p className="topbar-subtitle">{currentRoute.subtitle}</p>
    </div>
  );
}
