import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Style/layout.css";
import { useState } from "react";
import CategoryModal from "../Screens/CategoryModal";
import OfficerModal from "../Screens/OfficerModal";

export default function MainLayout() {
  const [search, setSearch] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const [showAddOfficerModal, setShowAddOfficerModal] = useState(false);

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
        {/* TOP BAR */}
        <TopNavbar
          setSidebarOpen={setSidebarOpen}
          searchValue={search}
          onSearchChange={setSearch}
          onSortClick={() => setShowSortModal(true)}
          onFilterClick={() => setShowFilterModal(true)}
          onPrimaryAction={() => {
            if (location.pathname === "/categories") {
              setShowAddCategoryModal(true);
            }

            if (location.pathname === "/officers") {
              setShowAddOfficerModal(true);
            }
          }}
        />

        {/* CATEGORY MODAL */}
        <CategoryModal
          open={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
          onSave={(data) => {
            setNewCategory(data);
            setShowAddCategoryModal(false);
          }}
          mode="add"
        />

        {/* OFFICER MODAL */}
        {/* <OfficerModal
          open={showAddOfficerModal}
          onClose={() => setShowAddOfficerModal(false)}
        /> */}

        {/* PAGE CONTENT */}
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
              showAddOfficerModal,
              setShowAddOfficerModal,
            }}
          />
        </div>
      </div>
    </div>
  );
}
