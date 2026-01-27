import "../Style/Citizens.css";
import { useEffect, useMemo, useState } from "react";
import { getCitizens, getCitizenDetails } from "../api/citizensApi";

export default function Citizens() {
  const [citizens, setCitizens] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  const PAGE_SIZE = 5;

  /* ===============================
     FETCH CITIZENS
  ================================ */
  useEffect(() => {
    getCitizens().then((data) => {
      setCitizens(data || []);
    });
  }, []);

  /* ===============================
     SAFE SEARCH FILTER
  ================================ */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return citizens.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const phone = c.phone || "";

      return name.includes(q) || phone.includes(search);
    });
  }, [citizens, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ===============================
     VIEW DETAILS
  ================================ */
  const handleViewDetails = async (citizen) => {
    setSelectedCitizen(citizen);

    try {
      const fullDetails = await getCitizenDetails(citizen.id);
      setSelectedCitizen((prev) => ({
        ...prev,
        ...fullDetails,
      }));
    } catch (err) {
      console.error("Failed to load citizen details", err);
    }
  };

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
        <table className="citizens-table citizens-data-table">
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
                <td>{citizen.name || "-"}</td>
                <td>{citizen.phone || "-"}</td>
                <td>{citizen.ward || "-"}</td>
                <td>{citizen.email || "-"}</td>
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

            {paginated.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No citizens found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* DETAILS MODAL */}
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
              <p><span>Name</span>{selectedCitizen.name || "-"}</p>
              <p><span>Phone</span>{selectedCitizen.phone || "-"}</p>
              <p><span>Email</span>{selectedCitizen.email || "-"}</p>
              <p><span>Ward</span>{selectedCitizen.ward || "-"}</p>

              {selectedCitizen.VoterId && (
                <p><span>Voter ID</span>{selectedCitizen.VoterId}</p>
              )}
              {selectedCitizen.city && (
                <p><span>City</span>{selectedCitizen.city}</p>
              )}
              {selectedCitizen.state && (
                <p><span>State</span>{selectedCitizen.state}</p>
              )}
              {selectedCitizen.bloodGroup && (
                <p><span>Blood Group</span>{selectedCitizen.bloodGroup}</p>
              )}
              {selectedCitizen.disability && (
                <p><span>Disability</span>{selectedCitizen.disability}</p>
              )}
              {selectedCitizen.language && (
                <p><span>Language</span>{selectedCitizen.language}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
