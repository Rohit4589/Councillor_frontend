import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Style/layout.css";
import { useState } from "react";
import CategoryModal from "../Screens/CategoryModal";

export default function MainLayout() {
    const [search, setSearch] = useState("");
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
      const [newCategory, setNewCategory] = useState(null);
      const [showSortModal, setShowSortModal] = useState(false);
      const [showFilterModal, setShowFilterModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-wrapper">
        {/* FULL WIDTH TOPBAR */}
        <TopNavbar
          setSidebarOpen={setSidebarOpen}
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
          onPrimaryAction={() => setShowAddCategoryModal(true)}
        />
        <CategoryModal
          open={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
          onSave={(data) => {
            setNewCategory(data);
            setShowAddCategoryModal(false);
          }}
          mode="add"
        />

        {/* PAGE CONTENT ONLY */}
        <div className="page-content">
          <Outlet
            context={{
              search,
              showSortModal,
              setShowSortModal,
              showFilterModal,
              setShowFilterModal,
              newCategory,
              clearNewCategory: () => setNewCategory(null),
            }}
          />
        </div>
      </div>
    </div>
  );
}
