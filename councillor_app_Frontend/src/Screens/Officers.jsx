import "../Style/officers.css";
import { useEffect, useState } from "react";

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

    /*
    🔴 WHEN API IS READY
    -------------------
    1. Uncomment below code
    2. Paste your API URL
    */

    /*
    fetch("http://localhost:5000/api/officers")
      .then(res => res.json())
      .then(data => setOfficers(data))
      .catch(err => console.error("Officers API Error:", err));
    */

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
