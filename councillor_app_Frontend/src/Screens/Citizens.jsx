import "../Style/Citizens.css";

const citizensData = [
  {
    name: "Rajesh Sharma",
    phone: "+91 9876543210",
    ward: "Ward 15",
    email: "rajesh@gmail.com",
  },
  {
    name: "Priya Desai",
    phone: "+91 9876543211",
    ward: "Ward 12",
    email: "rajesh@gmail.com",
  },
  {
    name: "Amit Kumar",
    phone: "+91 9876543212",
    ward: "Ward 8",
    email: "rajesh@gmail.com",
  },
  {
    name: "Sneha Patel",
    phone: "+91 9876543213",
    ward: "Ward 22",
    email: "rajesh@gmail.com",
  },
  {
    name: "Vijay Singh",
    phone: "+91 9876543214",
    ward: "Ward 5",
    email: "rajesh@gmail.com",
  },
];

export default function Citizens() {
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
            {citizensData.map((citizen, index) => (
              <tr key={index}>
                <td>{citizen.name}</td>
                <td>{citizen.phone}</td>
                <td>{citizen.ward}</td>
                <td>{citizen.email}</td>
                <td>
                  <button className="view-btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
