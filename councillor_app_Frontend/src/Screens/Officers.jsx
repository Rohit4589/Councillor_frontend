import "../Style/officers.css";
import { useEffect, useState } from "react";
import { getOfficers } from "../api/officersApi";

export default function Officers() {

  /* ================================
     STATE (STATIC FOR NOW)
     ================================ */

  const [officers, setOfficers] = useState([
    { id: 1, name: "Rajesh Sharma", phone: "+91 9876543210" },
    { id: 2, name: "Amit Kumar", phone: "+91 9876543211" },
    { id: 3, name: "Sneha Patel", phone: "+91 9876543212" },
    { id: 4, name: "Vijay Singh", phone: "+91 9876543213" },
  ]);

  /* ================================
     API FETCH (ENABLE LATER)
     ================================ */

  useEffect(() => {
    getOfficers()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOfficers(data);
        }
      })
      .catch((err) =>
        console.warn("Officers API Error, using static data", err)
      );
  }, []);


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
