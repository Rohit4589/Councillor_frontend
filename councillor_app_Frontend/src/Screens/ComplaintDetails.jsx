import "../Style/complaintDetails.css";
import { ArrowLeft, MapPin, User, Phone, CheckCircle, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ComplaintImages from "./ComplaintImages";
import ComplaintTranslate from "./ComplaintTranslate";
import { getComplaintById } from "../api/complaintsApi";

/* ===============================
   SAME DATA SOURCE (TEMP)
   =============================== */
const complaintsData = [
  {
    id: "CMP234567",
    category: "Street Lights",
    summary: "Broken street light on MG Road",
    description:
      "The street light near Shop No. 45, MG Road has been broken for the past 3 days.",
    statusTimeline: ["Submitted", "Seen", "In Progress"],
    ward: "Ward 15",
    date: "2024-12-05",
    location: "MG Road",
    citizen: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
    },
  },
  {
    id: "CMP234568",
    category: "Garbage Collection",
    summary: "Garbage not collected for 3 days",
    description:
      "Garbage collection has not happened for the last 3 days in Ward 12.",
    statusTimeline: ["Submitted"],
    ward: "Ward 12",
    date: "2024-12-05",
    location: "Pune Station Area",
    citizen: {
      name: "Amit Verma",
      phone: "+91 9123456789",
    },
  },
  {
    id: "CMP234569",
    category: "Water Supply",
    summary: "No water supply since morning",
    description:
      "Residents are facing water supply issues since morning hours.",
    statusTimeline: ["Submitted", "Seen", "In Progress", "Completed"],
    ward: "Ward 8",
    date: "2024-12-04",
    location: "Vimannagar",
    citizen: {
      name: "Sneha Patil",
      phone: "+91 9988776655",
    },
  },
  {
    id: "CMP234570",
    category: "Roads & Potholes",
    summary: "Large pothole causing accidents",
    description:
      "A large pothole near the main junction is causing frequent accidents.",
    statusTimeline: ["Submitted", "Seen"],
    ward: "Ward 15",
    date: "2024-12-04",
    location: "Hadapsar",
    citizen: {
      name: "Rakesh Kulkarni",
      phone: "+91 9012345678",
    },
  },
];

export default function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  /* ===============================
     BACKEND STATE
     =============================== */
  const [backendComplaint, setBackendComplaint] = useState(null);
  const [backendImages, setBackendImages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  /* ===============================
     FETCH COMPLAINT FROM BACKEND
     =============================== */
  useEffect(() => {
    getComplaintById(id)
      .then((data) => {
        setBackendComplaint(data);
        setBackendImages(data?.images || []);
      })
      .catch(() =>
        console.warn("Backend not ready, using static complaint data")
      );
  }, [id]);


  /* ===============================
     CURRENT WORKING DATA
     =============================== */
  const complaint = backendComplaint || complaintsData.find((c) => c.id === id);

  /* ===============================
     TEMP IMAGES
     =============================== */
  const images =
    backendImages.length > 0
      ? backendImages
      : [
          "https://picsum.photos/600/400?1",
          "https://picsum.photos/600/400?2",
          "https://picsum.photos/600/400?3",
        ];

  if (!complaint) {
    return (
      <div className="complaint-details-page">
        <p style={{ textAlign: "center", padding: "40px" }}>
          Complaint not found.
        </p>
      </div>
    );
  }

  return (
    <div className="complaint-details-page">
      <div className="details-grid">
        {/* LEFT SECTION */}
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
              <MapPin size={18} color="#1fd863ff" /> Location
            </h5>
            <p className="muted">
              {complaint.location + ", " + complaint.ward}
            </p>

            <div className="map-placeholder">
              <MapPin size={28} color="#1fd863ff" />
            </div>
          </div>

          <ComplaintImages images={images} />
        </div>

        {/* RIGHT SECTION */}
        <div className="details-right">
          <div className="card citizen-card">
            <h5 className="card-title">Citizen Information</h5>

            <div className="info-row">
              <User size={16} className="info-icon" />
              <div>
                <div className="info-label">Name</div>
                <div className="info-value">{complaint.citizen.name}</div>
              </div>
            </div>

            <div className="info-row">
              <Phone size={16} className="info-icon" />
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">{complaint.citizen.phone}</div>
              </div>
            </div>
          </div>

          <div className="card timeline-card">
            <h5 className="card-title">Progress Timeline</h5>

            <div className="timeline">
              {["Submitted", "Seen", "In Progress", "Completed"].map(
                (step, index) => {
                  const isActive = complaint.statusTimeline.includes(step);
                  const isLast = index === 3;

                  return (
                    <div className="timeline-row" key={step}>
                      <div className="timeline-left">
                        <span
                          className={`timeline-dot ${isActive ? "active" : ""}`}
                        >
                          <span className="timeline-dot-inner">
                            <span className="timeline-dot-core"></span>
                          </span>
                        </span>

                        {!isLast && <span className="timeline-line"></span>}
                      </div>

                      <span
                        className={`timeline-text ${isActive ? "active" : ""}`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <ComplaintTranslate complaint={complaint} />
        </div>
      </div>
    </div>
  );
}
