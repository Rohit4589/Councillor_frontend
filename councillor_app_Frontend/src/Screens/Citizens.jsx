import "../Style/Citizens.css";
import { useEffect, useMemo, useState } from "react";
import { getCitizens } from "../api/citizensApi";

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
     FETCH DATA (API + FALLBACK)
  ================================ */
  useEffect(() => {
    getCitizens()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCitizens(data);
        }
      })
      .catch(() => {
        // faker-style fallback
        setCitizens([
          {
            id: 1,
            name: "Johnathan Shanahan",
            phone: "616-393-9976",
            ward: "Ward 15",
            email: "rashawn35@gmail.com",
          },
          {
            id: 2,
            name: "Wallace Sipes",
            phone: "1-989-987-3375",
            ward: "Ward 19",
            email: "green_collins@hotmail.com",
          },
          {
            id: 3,
            name: "Reginald Bogisich",
            phone: "206-381-5052",
            ward: "Ward 27",
            email: "alfredo.ritchie67@yahoo.com",
          },
          {
            id: 4,
            name: "Dr. Jacob Little",
            phone: "1-232-884-8612",
            ward: "Ward 27",
            email: "enola63@yahoo.com",
          },
          {
            id: 5,
            name: "Lauren Rau",
            phone: "798-222-3028",
            ward: "Ward 9",
            email: "marquise3@gmail.com",
          },
          {
            id: 6,
            name: "Michael Scott",
            phone: "987-654-3210",
            ward: "Ward 12",
            email: "michael@dundermifflin.com",
          },
        ]);
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

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

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
                    onClick={() => setSelectedCitizen(citizen)}
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
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
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
              <p><span>Name</span>{selectedCitizen.name}</p>
              <p><span>Phone</span>{selectedCitizen.phone}</p>
              <p><span>Email</span>{selectedCitizen.email}</p>
              <p><span>Ward</span>{selectedCitizen.ward}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
