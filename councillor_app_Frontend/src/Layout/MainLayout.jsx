import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Style/layout.css";
import { useState } from "react";

export default function MainLayout() {
    const [search, setSearch] = useState("");

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-wrapper">
        {/* FULL WIDTH TOPBAR */}
        <TopNavbar searchValue={search} onSearchChange={setSearch} />

        {/* PAGE CONTENT ONLY */}
        <div className="page-content">
          <Outlet context={{ search }} />
        </div>
      </div>
    </div>
  );
}
