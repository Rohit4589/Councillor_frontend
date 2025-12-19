import "../Style/dashboard.css";
import { FileText, Users, Folder, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {

  /* ================================
     1️⃣ STATE (STATIC FOR NOW)
     ================================ */

  const [stats, setStats] = useState({
    totalComplaints: 1247,
    totalCouncillors: 45,
    totalCategories: 12,
    pendingReview: 38,
  });

  const [recentComplaints, setRecentComplaints] = useState([
    {
      id: "CMP234567",
      category: "Street Lights",
      status: "progress",
      time: "5 min ago",
    },
    {
      id: "CMP234568",
      category: "Garbage Collection",
      status: "completed",
      time: "12 min ago",
    },
    {
      id: "CMP234569",
      category: "Water Supply",
      status: "submitted",
      time: "23 min ago",
    },
    {
      id: "CMP234570",
      category: "Roads & Potholes",
      status: "progress",
      time: "1 hour ago",
    },
    {
      id: "CMP234571",
      category: "Drainage",
      status: "submitted",
      time: "2 hours ago",
    },
  ]);

  /* ================================
     2️⃣ API CALL (ENABLE LATER)
     ================================ */

  useEffect(() => {

    /*
    🔴 WHEN API IS READY
    -------------------
    1. Uncomment below code
    2. Replace API URL
    3. Remove static data if needed
    */

    /*
    fetch("http://localhost:5000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setRecentComplaints(data.recentComplaints);
      })
      .catch((error) => {
        console.error("Dashboard API Error:", error);
      });
    */

  }, []);

  return (
    <div className="page-wrapper">

      {/* ================================
         STAT CARDS
         ================================ */}
      <div className="dashboard-cards">
        <StatCard
          icon={<FileText />}
          iconBg="blue"
          value={stats.totalComplaints}
          label="Total Complaints"
        />
        <StatCard
          icon={<Users />}
          iconBg="purple"
          value={stats.totalCouncillors}
          label="Total Councillors"
        />
        <StatCard
          icon={<Folder />}
          iconBg="green"
          value={stats.totalCategories}
          label="Total Categories"
        />
        <StatCard
          icon={<Clock />}
          iconBg="yellow"
          value={stats.pendingReview}
          label="Pending Review"
        />
      </div>

      {/* ================================
         RECENT COMPLAINTS TABLE
         ================================ */}
      <div className="dashboard-table mt-4">
        <div className="dashboard-header">
          <h3>Recent Complaints</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Category</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {recentComplaints.map((item) => (
              <Row
                key={item.id}
                id={item.id}
                cat={item.category}
                status={item.status}
                time={item.time}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================================
   STAT CARD COMPONENT
   ================================ */
function StatCard({ icon, iconBg, value, label }) {
  return (
    <div className="stat-card">
      <div className={`icon-box ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h2>{value}</h2>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ================================
   TABLE ROW COMPONENT
   ================================ */
function Row({ id, cat, status, time }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{cat}</td>
      <td>
        <span className={`status ${status}`}>
          {status === "progress" && "In Progress"}
          {status === "completed" && "Completed"}
          {status === "submitted" && "Submitted"}
        </span>
      </td>
      <td className="time">{time}</td>
    </tr>
  );
}
