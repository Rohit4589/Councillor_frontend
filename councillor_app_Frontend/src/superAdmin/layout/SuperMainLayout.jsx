import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./SuperSidebar";
import SuperTopNavbar from "./SuperTopNavbar";
import "../Style/layout.css";
import { faker } from "@faker-js/faker";

// 🔴 BACKEND (ENABLE LATER)
// import {
//   getCouncillors,
//   createCouncillor,
// } from "../../api/superAdminCouncillorApi";

/* ================================
   FAKER DATA GENERATOR
================================ */
const generateFakeCouncillors = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number("9#########"),
    ward: `Ward ${faker.number.int({ min: 1, max: 25 })}`,
    status: faker.helpers.arrayElement(["active", "inactive"]),
  }));
};

export default function SuperMainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================================
     SHARED STATE
  ================================ */
  const [councillors, setCouncillors] = useState([]);

  /* ================================
     FETCH / INIT DATA
  ================================ */
  useEffect(() => {
    // 🔴 BACKEND VERSION
    /*
    const fetchData = async () => {
      const data = await getCouncillors();
      setCouncillors(data);
    };
    fetchData();
    */

    // ✅ FAKER DATA (DEV MODE)
    setCouncillors(generateFakeCouncillors());
  }, []);

  /* ================================
     CREATE COUNCILLOR
  ================================ */
  const handleCreateCouncillor = async (newCouncillor) => {
    // 🔴 BACKEND VERSION
    /*
    const savedCouncillor = await createCouncillor(newCouncillor);
    setCouncillors((prev) => [...prev, savedCouncillor]);
    */

    // ✅ STATIC (FAKER MODE)
    setCouncillors((prev) => [
      ...prev,
      {
        id: faker.string.uuid(),
        status: "active",
        ...newCouncillor,
      },
    ]);
  };

  return (
    <div className="super-admin admin-layout">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-wrapper">
        {/* ✅ SINGLE TOPBAR */}
        <SuperTopNavbar onCreate={handleCreateCouncillor} setSidebarOpen={setSidebarOpen} />

        <div className="page-content">
          {/* ✅ SHARE STATE WITH PAGES */}
          <Outlet context={{ councillors, setCouncillors }} />
        </div>
      </div>
    </div>
  );
}
