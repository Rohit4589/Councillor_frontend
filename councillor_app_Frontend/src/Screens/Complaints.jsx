import "../Style/complaints.css";
import { Eye } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComplaints } from "../api/complaintsApi";

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

  const [complaints, setComplaints] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    status: "",
    ward: "",
  });

  useEffect(() => {
    getComplaints()
      .then(setComplaints)
      .catch(console.error);
  }, []);

  const finalData = complaints
    .filter((c) =>
      `${c.id} ${c.category} ${c.summary} ${c.status} ${c.ward} ${c.date}`
        .toLowerCase()
        .includes(safeSearch)
    )
    .sort((a, b) => {
      if (!sortOrder) return 0;
      return sortOrder === "new"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    })
    .filter(
      (c) =>
        (!filters.category || c.category === filters.category) &&
        (!filters.status || c.status === filters.status) &&
        (!filters.ward || c.ward === filters.ward)
    );

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
            {finalData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.summary}</td>
                <td>
                  <span className={`status ${item.status}`}>
                    {item.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td>{item.ward}</td>
                <td>{item.date}</td>
                <td>
                  <Eye
                    size={16}
                    onClick={() => navigate(`/complaints/${item.id}`)}
                    className="eye-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
