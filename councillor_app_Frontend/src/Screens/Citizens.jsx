import "../Style/Citizens.css";
import { useEffect, useState } from "react";
import { getCitizens } from "../api/citizensApi";

export default function Citizens() {

  /* ================================
     STATE (STATIC FOR NOW)
     ================================ */

  const [citizens, setCitizens] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      phone: "+91 9876543210",
      ward: "Ward 15",
      email: "rajesh@gmail.com",
      aadhar: "7539 4665 4574",
      city: "Chennai",
      state: "Tamil Nadu",
      bloodGroup: "O+ ve",
      disability: "None",
      language: "English",
    },
    {
      id: 2,
      name: "Priya Desai",
      phone: "+91 9876543211",
      ward: "Ward 12",
      email: "priya@gmail.com",
      aadhar: "6539 1234 9876",
      city: "Mumbai",
      state: "Maharashtra",
      bloodGroup: "A+ ve",
      disability: "None",
      language: "Hindi",
    },
    {
      id: 3,
      name: "Amit Kumar",
      phone: "+91 9876543212",
      ward: "Ward 8",
      email: "amit@gmail.com",
    },
    {
      id: 4,
      name: "Sneha Patel",
      phone: "+91 9876543213",
      ward: "Ward 22",
      email: "sneha@gmail.com",
    },
    {
      id: 5,
      name: "Vijay Singh",
      phone: "+91 9876543214",
      ward: "Ward 5",
      email: "vijay@gmail.com",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  /* ================================
     API FETCH (ENABLE LATER)
     ================================ */

  useEffect(() => {
    getCitizens()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCitizens(data);
        }
      })
      .catch((err) =>
        console.warn("Citizens API Error, using static data", err)
      );
  }, []);


  /* ================================
     HANDLERS
     ================================ */

  const handleViewDetails = (citizen) => {
    setSelectedCitizen(citizen);
    setShowModal(true);
  };

  return (
    <div className="page-wrapper">
      <div className="citizens-card">
        <table className="citizens-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Ward</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {citizens.map((citizen) => (
              <tr key={citizen.id}>
                <td>{citizen.name}</td>
                <td>{citizen.phone}</td>
                <td>{citizen.ward}</td>
                <td>{citizen.email}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleViewDetails(citizen)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================================
         DETAILS MODAL
         ================================ */}
      {showModal && selectedCitizen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Citizen Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p><span>Name</span> {selectedCitizen.name}</p>
              <p><span>Phone Number</span> {selectedCitizen.phone}</p>
              <p><span>Email</span> {selectedCitizen.email}</p>
              <p><span>Ward</span> {selectedCitizen.ward}</p>
              <p><span>Aadhar Number</span> {selectedCitizen.aadhar || "-"}</p>
              <p><span>City</span> {selectedCitizen.city || "-"}</p>
              <p><span>State</span> {selectedCitizen.state || "-"}</p>
              <p><span>Blood Group</span> {selectedCitizen.bloodGroup || "-"}</p>
              <p><span>Disability</span> {selectedCitizen.disability || "-"}</p>
              <p><span>Language</span> {selectedCitizen.language || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
