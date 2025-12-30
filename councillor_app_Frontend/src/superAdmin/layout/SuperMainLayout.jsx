import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./SuperSidebar";
import SuperTopNavbar from "./SuperTopNavbar";
import "../Style/layout.css";
import { faker } from "@faker-js/faker";

/* ================================
   FAKER DATA GENERATOR
================================ */
const generateFakeCouncillors = (count = 6) => {
  return Array.from({ length: count }).map(() => {
    const city = faker.location.city();

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      phone: faker.phone.number("9#########"),
      ward: `Ward ${faker.number.int({ min: 1, max: 25 })}`,
      city: city,
      corporation: `${city} Municipal Corporation`,
      status: faker.helpers.arrayElement(["active", "inactive"]),
    };
  });
};

export default function SuperMainLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================================
     SHARED STATE
  ================================ */
  const [councillors, setCouncillors] = useState([]);

  /* ================================
     INIT DATA
  ================================ */
  useEffect(() => {
    setCouncillors(generateFakeCouncillors());
  }, []);

  /* ================================
     CREATE COUNCILLOR
  ================================ */
  const handleCreateCouncillor = (newCouncillor) => {
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
          <Outlet context={{ councillors, setCouncillors }} />
        </div>
      </div>
    </div>
  );
}
