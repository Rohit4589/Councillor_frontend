import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./SuperSidebar";
import SuperTopNavbar from "./SuperTopNavbar";
import "../Style/layout.css";

// 🔴 BACKEND (ENABLE LATER)
// import { useEffect } from "react";
// import {
//   getCouncillors,
//   createCouncillor,
// } from "../../api/superAdminCouncillorApi";

export default function SuperMainLayout() {
  /* ================================
     SHARED STATE (STATIC FOR NOW)
     ================================ */
  const [councillors, setCouncillors] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      phone: "+91 9876543210",
      ward: "Ward 15",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Desai",
      phone: "+91 9876543211",
      ward: "Ward 12",
      status: "active",
    },
  ]);

  /* ================================
     CREATE (STATIC VERSION)
     ================================ */
  const handleCreateCouncillor = (newCouncillor) => {
    setCouncillors((prev) => [
      ...prev,
      {
        id: Date.now(),
        status: "active",
        ...newCouncillor,
      },
    ]);
  };

  /* ================================
     🔴 BACKEND VERSION (ENABLE LATER)
     ================================ */
  /*
  useEffect(() => {
    getCouncillors()
      .then((data) => setCouncillors(data))
      .catch((err) =>
        console.error("Councillor API Error:", err)
      );
  }, []);

  const handleCreateCouncillor = async (newCouncillor) => {
    const savedCouncillor = await createCouncillor(newCouncillor);
    setCouncillors((prev) => [...prev, savedCouncillor]);
  };
  */

  return (
    <div className="super-admin admin-layout">
      <Sidebar />

      <div className="main-wrapper">
        {/* ✅ SINGLE TOPBAR */}
        <SuperTopNavbar onCreate={handleCreateCouncillor} />

        <div className="page-content">
          {/* ✅ SHARE STATE WITH PAGES */}
          <Outlet context={{ councillors, setCouncillors }} />
        </div>
      </div>
    </div>
  );
}
