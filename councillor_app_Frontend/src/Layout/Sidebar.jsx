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

export default function Sidebar() {
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
        <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarLink to="/categories" icon={<Layers size={18} />} label="Categories" />
        <SidebarLink to="/citizens" icon={<Users size={18} />} label="Citizens" />
        <SidebarLink to="/complaints" icon={<FileText size={18} />} label="Complaints" />
        <SidebarLink to="/officers" icon={<UserCog size={18} />} label="Officers" />
        <SidebarLink to="/create-event" icon={<CalendarPlus size={18} />} label="Create Event" />
      </nav>

      {/* LOGOUT */}
      <div className="sidebar-logout">
        <LogOut size={18} /> Logout
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
