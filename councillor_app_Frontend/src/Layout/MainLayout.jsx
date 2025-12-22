import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Style/layout.css";
import { useState } from "react";

export default function MainLayout() {
    const [search, setSearch] = useState("");
      const [showSortModal, setShowSortModal] = useState(false);
      const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-wrapper">
        {/* FULL WIDTH TOPBAR */}
        <TopNavbar
          searchValue={search}
          onSearchChange={setSearch}
          onSortClick={() => {
            console.log("OPEN SORT MODAL");
            setShowSortModal(true);
          }}
          onFilterClick={() => {
            console.log("OPEN FILTER MODAL");
            setShowFilterModal(true);
          }}
        />

        {/* PAGE CONTENT ONLY */}
        <div className="page-content">
          <Outlet context={{ search, showSortModal, setShowSortModal, showFilterModal, setShowFilterModal }} />
        </div>
      </div>
    </div>
  );
}
