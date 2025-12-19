import "../Style/complaints.css";
import { Eye } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

/* ===============================
   STATIC DATA (FOR NOW)
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

  /* 🔑 SEARCH VALUE COMING FROM TOPBAR */
  const { search } = useOutletContext();

  const safeSearch = (search || "").toLowerCase();

  /* 🔍 FILTER LOGIC */
  const filteredComplaints = complaintsData.filter((c) =>
    `${c.id} ${c.category} ${c.summary} ${c.status} ${c.ward} ${c.date}`
      .toLowerCase()
      .includes(safeSearch)
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
            {filteredComplaints.map((item) => (
              <ComplaintRow key={item.id} {...item} navigate={navigate} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===============================
   ROW COMPONENT
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
