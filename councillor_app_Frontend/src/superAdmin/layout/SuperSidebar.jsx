import {
  LayoutDashboard,
  Layers,
  Users,
  FileText,
  UserCog,
  CalendarPlus,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you’ll clear JWT here
    // localStorage.removeItem("token");
    localStorage.clear(); 

    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo d-flex align-items-center gap-3">
        <img src={logo} alt="WardMitra" className="sidebar-logo-img" />
        <div>
          <h4 className="sidebar-title">WardMitra</h4>
          <small className="sidebar-subtitle">"A Bond of Trust"</small>
        </div>
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        <SidebarLink
          to="/councillor"
          icon={<LayoutDashboard size={18} />}
          label="Councillor "
        />
      </nav>

      {/* LOGOUT */}
      <div
        className="sidebar-logout"
        onClick={handleLogout}
        role="button"
        tabIndex={0}
      >
        <LogOut size={18} />
        Logout
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
    >
      {icon}
      {label}
    </NavLink>
  );
}
