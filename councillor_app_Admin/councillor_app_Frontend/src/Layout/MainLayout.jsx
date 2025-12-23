import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Style/layout.css";

export default function MainLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-wrapper">
        {/* FULL WIDTH TOPBAR */}
        <TopNavbar />

        {/* PAGE CONTENT ONLY */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
