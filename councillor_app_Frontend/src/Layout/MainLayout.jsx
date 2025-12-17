import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Style/layout.css";

export default function MainLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-wrapper">
        {/* FULL WIDTH TOPBAR */}
        <TopNavbar />

        {/* PAGE CONTENT ONLY */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
