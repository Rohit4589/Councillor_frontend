import "../Style/officers.css";

export default function Officers() {
  const officers = [
    { name: "Rajesh Sharma", phone: "+91 9876543210" },
    { name: "Amit Verma", phone: "+91 9123456780" },
    { name: "Sneha Patil", phone: "+91 9988776655" },
    { name: "Rohit Kulkarni", phone: "+91 9090909090" },
    { name: "Neha Joshi", phone: "+91 8899776655" },
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
