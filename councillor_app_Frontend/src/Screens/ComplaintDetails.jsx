import "../Style/complaintDetails.css";
import { ArrowLeft, MapPin, User, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ComplaintImages from "./ComplaintImages";
import ComplaintTranslate from "./ComplaintTranslate";
import { getComplaintById } from "../api/complaintsApi";

export default function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    getComplaintById(id).then(setComplaint);
  }, [id]);

  if (!complaint) {
    return (
      <div className="complaint-details-page">
        <p style={{ textAlign: "center", padding: "40px" }}>
          Loading complaint details...
        </p>
      </div>
    );
  }

  const timelineSteps = [
    "Submitted",
    "Seen",
    "In Progress",
    "Completed",
  ];

  return (
    <div className="complaint-details-page">
      {/* HEADER */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h3>Complaint Details</h3>
          <span className="complaint-id">{complaint.id}</span>
        </div>
      </div>

      <div className="details-grid">
        {/* LEFT */}
        <div className="details-left">
          <div className="card">
            <div className="tag-row">
              <span className="tag">{complaint.category}</span>
              <span className="date">{complaint.date}</span>
            </div>

            <h4>{complaint.summary}</h4>
            <p className="muted">{complaint.description}</p>
          </div>

          <div className="card ai-card">
            <h5>⚡ AI Summary</h5>
            <p>
              Issue related to {complaint.category}. Assigned to{" "}
              {complaint.ward}. Estimated resolution in 2–3 days.
            </p>
          </div>

          <div className="card">
            <h5>
              <MapPin size={16} /> Location
            </h5>
            <p className="muted">
              {complaint.location}, {complaint.ward}
            </p>
            <div className="map-placeholder">
              <MapPin size={28} />
            </div>
          </div>

          <ComplaintImages images={complaint.images} />
        </div>

        {/* RIGHT */}
        <div className="details-right">
          <div className="card citizen-card">
            <h5>Citizen Information</h5>

            <div className="info-row">
              <User size={16} />
              <div>
                <div className="info-label">Name</div>
                <div className="info-value">
                  {complaint.citizen.name}
                </div>
              </div>
            </div>

            <div className="info-row">
              <Phone size={16} />
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">
                  {complaint.citizen.phone}
                </div>
              </div>
            </div>
          </div>

          {/* ✅ PROGRESS TIMELINE (NOW CORRECT) */}
          <div className="card timeline-card">
            <h5>Progress Timeline</h5>

            <div className="timeline">
              {timelineSteps.map((step) => {
                const active =
                  complaint.statusTimeline.includes(step);
                return (
                  <div className="timeline-row" key={step}>
                    <span
                      className={`timeline-dot ${
                        active ? "active" : ""
                      }`}
                    />
                    <span
                      className={`timeline-text ${
                        active ? "active" : ""
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🌐 ONLY TRANSLATION */}
          <ComplaintTranslate complaint={complaint} />
        </div>
      </div>
    </div>
  );
}
