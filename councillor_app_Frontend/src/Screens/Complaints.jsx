import "../Style/complaints.css";
import { Eye } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComplaints } from "../api/complaintsApi";
import { getLoggedInUser } from "../api/authApi";


/* ===============================
   ✅ ADDED: DATE + TIME FORMATTER
   =============================== */
const formatDateTime = (value) => {
  if (!value) return "-";

  const d = new Date(value);
  if (isNaN(d)) return value; // safety for backend strings

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function Complaints() {
  const navigate = useNavigate();

  const {
    search,
    showSortModal,
    setShowSortModal,
    showFilterModal,
    setShowFilterModal,
  } = useOutletContext();

  const safeSearch = (search || "").toLowerCase();

  const [sortOrder, setSortOrder] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    ward: "",
  });

  const [backendComplaints, setBackendComplaints] = useState([]);

useEffect(() => {
  const user = getLoggedInUser();

  if (!user?.id) return;

  getComplaints({
    councillorId: user.id, // ✅ dynamic from login
    limit: 20,
    offset: 0,
    filters,
  })
    .then(setBackendComplaints)
    .catch((err) => console.error("Complaints API Error", err));
}, [filters]);

  /* ======================================================
     🔥 UNIFIED DATA PIPELINE (STATIC + BACKEND)
     ====================================================== */

  // 1️⃣ Choose data source
const sourceData = backendComplaints;


  const searchedData = sourceData.filter((c) =>
    `${c.id} ${c.category} ${c.summary} ${c.status} ${c.ward} ${c.date}`
      .toLowerCase()
      .includes(safeSearch)
  );

 const filteredData = searchedData.filter((c) => {
   return (
     (!filters.category || c.category === filters.category) &&
     (!filters.status || c.status === filters.status) &&
     (!filters.ward || c.ward === filters.ward)
   );
 });

 const dataToRender = [...filteredData].sort((a, b) => {
   if (!sortOrder) return 0;

   return sortOrder === "new"
     ? new Date(b.date) - new Date(a.date)
     : new Date(a.date) - new Date(b.date);
 });


  return (
    <div className="complaints-page">
      <div className="complaints-card">
        {/* 🔑 Added class for mobile */}
        <table className="complaints-table complaints-data-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Category</th>
              <th>Summary</th>
              <th>Status</th>
              <th>Ward</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dataToRender.map((item) => (
              <ComplaintRow
                key={item.id}
                {...item}
                navigate={navigate}
              />
            ))}

            {dataToRender.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: 24 }}>
                  No complaints found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SORT & FILTER MODALS — UNCHANGED */}
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
              onChange={(e) =>
                setFilters({ ...filters, ward: e.target.value })
              }
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
   ROW (ONLY MOBILE ATTRIBUTES ADDED)
================================ */
function ComplaintRow({ id, category, summary, status, ward, date, navigate }) {
  return (
    <tr>
      <td data-label="Complaint ID">{id}</td>
      <td data-label="Category">{category}</td>
      <td data-label="Summary">{summary}</td>
      <td data-label="Status">
        <span className={`status ${status}`}>
          {status === "progress" && "In Progress"}
          {status === "submitted" && "Submitted"}
          {status === "completed" && "Completed"}
          {status === "seen" && "Seen"}
        </span>
      </td>
      <td data-label="Ward">{ward}</td>
      <td data-label="Date">{formatDateTime(date)}</td>
      <td data-label="Actions" className="action-col">
        <Eye
          size={16}
          className="eye-icon"
          onClick={() => navigate(`/complaints/${id}`)}
        />
      </td>
    </tr>
  );
}
  