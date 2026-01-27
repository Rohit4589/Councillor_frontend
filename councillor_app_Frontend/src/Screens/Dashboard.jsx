import "../Style/dashboard.css";
import { FileText, Folder, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboardApi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    totalCategories: 0,
    pendingReview: 0,
  });

  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        const data = res.data;

        setStats({
          totalComplaints: data.totalComplaints,
          totalCategories: data.totalCategories,
          pendingReview: data.pendingReview,
        });

        setRecentComplaints(
          data.recentComplaints.map((item) => ({
            id: item.id,
            category: item.category || "—",
            status: mapStatus(item.status),
            time: new Date(item.created_at).toLocaleString(),
          })),
        );

        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  }

  return (
    <div className="page-wrapper">
      {/* ================= STAT CARDS ================= */}
      <div className="dashboard-cards">
        <StatCard
          icon={<FileText />}
          iconBg="blue"
          value={stats.totalComplaints}
          label="Total Complaints"
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

      {/* ================= RECENT COMPLAINTS ================= */}
      <div className="dashboard-table mt-4">
        <div className="dashboard-header">
          <h3>Recent Complaints</h3>
        </div>

        <table className="dashboard-data-table">
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

/* ================= HELPERS ================= */
function mapStatus(status) {
  if (status === "in_progress") return "progress";
  if (status === "completed") return "completed";
  return "submitted";
}


/* ================= STAT CARD ================= */
function StatCard({ icon, iconBg, value, label }) {
  return (
    <div className="stat-card">
      <div className={`icon-box ${iconBg}`}>{icon}</div>
      <div>
        <h2>{value}</h2>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ================= TABLE ROW ================= */
function Row({ id, cat, status, time }) {
  return (
    <tr>
      <td data-label="Complaint ID">{id}</td>

      <td data-label="Category">{cat}</td>

      <td data-label="Status">
        <span className={`status ${status}`}>
          {status === "progress" && "In Progress"}
          {status === "completed" && "Completed"}
          {status === "submitted" && "Submitted"}
        </span>
      </td>

      <td data-label="Time" className="time">
        {time}
      </td>
    </tr>
  );
}
