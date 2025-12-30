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
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";


export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    // 1️⃣ Remove token
    localStorage.removeItem("token");

    // (optional but good)
    localStorage.clear(); // if you store more auth data later

    // 2️⃣ Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
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
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />
        <SidebarLink
          to="/categories"
          icon={<Layers size={18} />}
          label="Categories"
        />
        <SidebarLink
          to="/citizens"
          icon={<Users size={18} />}
          label="Citizens"
        />
        <SidebarLink
          to="/complaints"
          icon={<FileText size={18} />}
          label="Complaints"
        />
        <SidebarLink
          to="/officers"
          icon={<UserCog size={18} />}
          label="Officers"
        />
        <SidebarLink
          to="/create-event"
          icon={<CalendarPlus size={18} />}
          label="Create Event"
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
      className={({ isActive }) =>
        `sidebar-link ${isActive ? "active" : ""}`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
