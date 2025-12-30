import "../Style/Citizens.css";
import { useEffect, useMemo, useState } from "react";
import { getCitizens, getCitizenDetails } from "../api/citizensApi";

export default function Citizens() {
  /* ================================
     STATE
  ================================ */
  const [citizens, setCitizens] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  const PAGE_SIZE = 5;

  /* ================================
     FETCH DATA (API decides faker/backend)
  ================================ */
  useEffect(() => {
    getCitizens().then((data) => {
      setCitizens(data);
    });
  }, []);

  /* ================================
     SEARCH + PAGINATION
  ================================ */
  const filtered = useMemo(() => {
    return citizens.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [citizens, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ================================
     VIEW DETAILS (FULL DATA)
  ================================ */
const handleViewDetails = async (citizen) => {
  // ✅ OPEN MODAL IMMEDIATELY with existing data
  setSelectedCitizen(citizen);

  // 🔄 FETCH FULL DETAILS IN BACKGROUND
  try {
    const fullDetails = await getCitizenDetails(citizen.id);

    // ✅ UPDATE MODAL WITH FULL DATA
    setSelectedCitizen((prev) => ({
      ...prev,
      ...fullDetails,
    }));
  } catch {
    // fallback: keep existing data
  }
};


  /* ================================
     UI
  ================================ */
  return (
    <div className="page-wrapper">
      <div className="citizens-card">
        {/* SEARCH */}
        <div className="citizens-toolbar">
          <input
            className="search-input"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* TABLE */}
        <table className="citizens-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Ward</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((citizen) => (
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

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL (UI UNCHANGED) */}
      {selectedCitizen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Citizen Details</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedCitizen(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p>
                <span>Name</span>
                {selectedCitizen.name}
              </p>
              <p>
                <span>Phone</span>
                {selectedCitizen.phone}
              </p>
              <p>
                <span>Email</span>
                {selectedCitizen.email}
              </p>
              <p>
                <span>Ward</span>
                {selectedCitizen.ward}
              </p>

              {/* These will appear automatically from faker/backend */}
              {selectedCitizen.VoterId && (
                <p>
                  <span>Voter-Id</span>
                  {selectedCitizen.VoterId}
                </p>
              )}
              {selectedCitizen.city && (
                <p>
                  <span>City</span>
                  {selectedCitizen.city}
                </p>
              )}
              {selectedCitizen.state && (
                <p>
                  <span>State</span>
                  {selectedCitizen.state}
                </p>
              )}
              {selectedCitizen.bloodGroup && (
                <p>
                  <span>Blood Group</span>
                  {selectedCitizen.bloodGroup}
                </p>
              )}
              {selectedCitizen.disability && (
                <p>
                  <span>Disability</span>
                  {selectedCitizen.disability}
                </p>
              )}
              {selectedCitizen.language && (
                <p>
                  <span>Language</span>
                  {selectedCitizen.language}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
