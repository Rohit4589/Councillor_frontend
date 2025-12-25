import "../Style/officers.css";
import { useEffect, useState } from "react";
import { getOfficers } from "../api/officersApi";

export default function Officers() {
  /* ================================
     STATE
  ================================ */
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================================
     FETCH OFFICERS
  ================================ */
  useEffect(() => {
    getOfficers()
      .then((data) => {
        setOfficers(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading officers...</p>;
  }

  return (
    <div className="officers-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="phone-col">Phone Number</th>
          </tr>
        </thead>

        <tbody>
          {officers.map((officer) => (
            <tr key={officer.id}>
              <td>{officer.name}</td>
              <td className="phone-col">{officer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
