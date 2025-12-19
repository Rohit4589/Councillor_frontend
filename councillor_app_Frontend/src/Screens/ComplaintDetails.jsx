import "../Style/complaintDetails.css";
import { ArrowLeft, MapPin, User, Phone, CheckCircle, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react"; // 🔥 ADD

export default function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔥 IMAGE PREVIEW STATE
  const images = [
    "https://picsum.photos/600/400?1",
    "https://picsum.photos/600/400?2",
    "https://picsum.photos/600/400?3",
  ];
  const [previewIndex, setPreviewIndex] = useState(null);

  return (
    <div className="complaint-details-page">
      <div className="details-grid">
        {/* LEFT SECTION */}
        <div className="details-left">
          <div className="card">
            <div className="tag-row">
              <span className="tag">Street Lights</span>
              <span className="date">2024-12-05</span>
            </div>

            <h4>Broken street light on MG Road</h4>
            <p className="muted">
              The street light near Shop No. 45, MG Road has been broken for the
              past 3 days.
            </p>
          </div>

          <div className="card ai-card">
            <h5>⚡ AI Summary</h5>
            <p>
              Street light maintenance required at MG Road location. Priority:
              Medium. Estimated resolution time: 2–3 days. Assigned to Ward 15
              councillor.
            </p>
          </div>

          <div className="card">
            <h5>
              <MapPin size={18} color="#1fd863ff" /> Location
            </h5>
            <p className="muted">MG Road, Ward 15</p>

            <div className="map-placeholder">
              <MapPin size={28} color="#1fd863ff" />
            </div>
          </div>

          {/* 🔥 IMAGES */}
          <div className="card">
            <div className="image-grid">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setPreviewIndex(index)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="details-right">
          <div className="card citizen-card">
            <h5 className="card-title">Citizen Information</h5>

            <div className="info-row">
              <User size={16} className="info-icon" />
              <div>
                <div className="info-label">Name</div>
                <div className="info-value">Rahul Sharma</div>
              </div>
            </div>

            <div className="info-row">
              <Phone size={16} className="info-icon" />
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">+91 9876543210</div>
              </div>
            </div>
          </div>

          <div className="card timeline-card">
            <h5 className="card-title">Progress Timeline</h5>

            <div className="timeline">
              <div className="timeline-item active">
                <span className="dot"></span>
                <span>Submitted</span>
              </div>
              <div className="timeline-item active">
                <span className="dot"></span>
                <span>Seen</span>
              </div>
              <div className="timeline-item active">
                <span className="dot"></span>
                <span>In Progress</span>
              </div>
              <div className="timeline-item">
                <span className="dot"></span>
                <span>Completed</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h5 style={{ fontSize: "14px" }}>Quick Actions</h5>
            <button className="action-btn">
              <CheckCircle size={16} /> Translate
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 IMAGE PREVIEW MODAL */}
      {previewIndex !== null && (
        <div
          className="image-modal-overlay"
          onClick={() => setPreviewIndex(null)}
        >
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>View Image</h5>
              <X
                className="modal-close"
                onClick={() => setPreviewIndex(null)}
              />
            </div>

            <img src={images[previewIndex]} alt="" />

            <div className="modal-actions">
              <button className="back"
                onClick={() =>
                  setPreviewIndex((prev) => (prev > 0 ? prev - 1 : prev))
                }
              >
                Back
              </button>

              <button
                onClick={() =>
                  setPreviewIndex((prev) =>
                    prev < images.length - 1 ? prev + 1 : prev
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
