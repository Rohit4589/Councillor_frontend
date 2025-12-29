import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Super Admin must NOT access ward admin pages
  if (role === "SUPER_ADMIN") {
    return <Navigate to="/super/councillor" replace />;
  }

  // ✅ Ward Admin allowed
  return children;
}
