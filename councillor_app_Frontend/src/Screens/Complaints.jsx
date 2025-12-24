import "../Style/complaints.css";
import { Eye } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComplaints } from "../api/complaintsApi";

/* ===============================
   STATIC DATA (FALLBACK)
   =============================== */
const complaintsData = [
  {
    id: "CMP234567",
    category: "Street Lights",
    summary: "Broken street light on MG Road",
    status: "progress",
    ward: "Ward 15",
    date: "2024-12-05",
  },
  {
    id: "CMP234568",
    category: "Garbage Collection",
    summary: "Garbage not collected for 3 days",
    status: "submitted",
    ward: "Ward 12",
    date: "2024-12-05",
  },
  {
    id: "CMP234569",
    category: "Water Supply",
    summary: "No water supply since morning",
    status: "completed",
    ward: "Ward 8",
    date: "2024-12-04",
  },
  {
    id: "CMP234570",
    category: "Roads & Potholes",
    summary: "Large pothole causing accidents",
    status: "seen",
    ward: "Ward 15",
    date: "2024-12-04",
  },
];

export default function Complaints() {
  const navigate = useNavigate();

  /* 🔑 SEARCH VALUE FROM TOPBAR (UNCHANGED) */
  const {
    search,
    showSortModal,
    setShowSortModal,
    showFilterModal,
    setShowFilterModal,
  } = useOutletContext();

  const safeSearch = (search || "").toLowerCase();

  /* ===============================
     SORT & FILTER STATE (UNCHANGED)
     =============================== */
  const [sortOrder, setSortOrder] = useState(null); // "new" | "old"

  const [filters, setFilters] = useState({
    category: "",
    status: "",
    ward: "",
  });

  /* ===============================
     BACKEND STATE
     =============================== */
  const [backendComplaints, setBackendComplaints] = useState([]);

  /* ===============================
     BACKEND API CALL
     =============================== */
  useEffect(() => {
    getComplaints()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBackendComplaints(data);
        }
      })
      .catch((err) =>
        console.warn("Complaints API Error, using static data", err)
      );
  }, []);

  /* ======================================================
     🔥 UNIFIED DATA PIPELINE (STATIC + BACKEND)
     ====================================================== */

  // 1️⃣ Choose data source
  const sourceData =
    backendComplaints.length > 0 ? backendComplaints : complaintsData;

  // 2️⃣ SEARCH
  const searchedData = sourceData.filter((c) =>
    `${c.id} ${c.category} ${c.summary} ${c.status} ${c.ward} ${c.date}`
      .toLowerCase()
      .includes(safeSearch)
  );

  // 3️⃣ SORT
  const sortedData = [...searchedData].sort((a, b) => {
    if (!sortOrder) return 0;

    const d1 = new Date(a.date);
    const d2 = new Date(b.date);

    return sortOrder === "new" ? d2 - d1 : d1 - d2;
  });

  // 4️⃣ FILTER
  const finalComplaints = sortedData.filter((c) => {
    return (
      (!filters.category || c.category === filters.category) &&
      (!filters.status || c.status === filters.status) &&
      (!filters.ward || c.ward === filters.ward)
    );
  });

  // 5️⃣ FINAL DATA FOR TABLE
  const dataToRender = finalComplaints;

  return (
    <div className="complaints-page">
      <div className="complaints-card">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Category</th>
              <th>Summary</th>
              <th>Status</th>
              <th>Ward</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dataToRender.map((item) => (
              <ComplaintRow key={item.id} {...item} navigate={navigate} />
            ))}

            {dataToRender.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "24px",
                    color: "#6b7280",
                  }}
                >
                  No complaints found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===============================
         SORT MODAL (UNCHANGED)
         =============================== */}
      {showSortModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>Sort Complaints</h4>

            <button
              onClick={() => {
                setSortOrder("new");
                setShowSortModal(false);
              }}
            >
              Date: Newest to Oldest
            </button>

            <button
              onClick={() => {
                setSortOrder("old");
                setShowSortModal(false);
              }}
            >
              Date: Oldest to Newest
            </button>

            <button className="ghost" onClick={() => setShowSortModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===============================
         FILTER MODAL (UNCHANGED)
         =============================== */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h4>Filter Complaints</h4>
              <button
                className="modal-close"
                onClick={() => setShowFilterModal(false)}
              >
                ✕
              </button>
            </div>

            <select
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option>Street Lights</option>
              <option>Garbage Collection</option>
              <option>Water Supply</option>
              <option>Roads & Potholes</option>
            </select>

            <select
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="completed">Completed</option>
              <option value="seen">Seen</option>
            </select>

            <select
              onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
            >
              <option value="">All Wards</option>
              <option>Ward 15</option>
              <option>Ward 12</option>
              <option>Ward 8</option>
            </select>

            <button onClick={() => setShowFilterModal(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===============================
   ROW COMPONENT (UNCHANGED)
   =============================== */
function ComplaintRow({ id, category, summary, status, ward, date, navigate }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{category}</td>
      <td>{summary}</td>
      <td>
        <span className={`status ${status}`}>
          {status === "progress" && "In Progress"}
          {status === "submitted" && "Submitted"}
          {status === "completed" && "Completed"}
          {status === "seen" && "Seen"}
        </span>
      </td>
      <td>{ward}</td>
      <td>{date}</td>
      <td className="action-col">
        <Eye
          size={16}
          className="eye-icon"
          onClick={() => navigate(`/complaints/${id}`)}
        />
      </td>
    </tr>
  );
}
