import "../Style/dashboard.css";
import {
  FileText,
  Users,
  Folder,
  Clock
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
    

      {/* ===== STAT CARDS ===== */}
      <div className="dashboard-cards">
        <StatCard
          icon={<FileText />}
          iconBg="blue"
          value="1,247"
          label="Total Complaints"
        />
        <StatCard
          icon={<Users />}
          iconBg="purple"
          value="45"
          label="Total Councillors"
        />
        <StatCard
          icon={<Folder />}
          iconBg="green"
          value="12"
          label="Total Categories"
        />
        <StatCard
          icon={<Clock />}
          iconBg="yellow"
          value="38"
          label="Pending Review"
        />
      </div>

      {/* ===== RECENT COMPLAINTS ===== */}
      <div className="dashboard-table mt-4">
        <h3>Recent Complaints</h3>

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
            <Row id="CMP234567" cat="Street Lights" status="progress" time="5 min ago" />
            <Row id="CMP234568" cat="Garbage Collection" status="completed" time="12 min ago" />
            <Row id="CMP234569" cat="Water Supply" status="submitted" time="23 min ago" />
            <Row id="CMP234570" cat="Roads & Potholes" status="progress" time="1 hour ago" />
            <Row id="CMP234571" cat="Drainage" status="submitted" time="2 hours ago" />
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ===== CARD ===== */
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

/* ===== TABLE ROW ===== */
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
