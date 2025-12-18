import "../Style/officers.css";

export default function Officers() {
  const officers = [
    { name: "Rajesh Sharma", phone: "+91 9876543210" },
    
  ];

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
          {officers.map((officer, index) => (
            <tr key={index}>
              <td>{officer.name}</td>
              <td className="phone-col">{officer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
