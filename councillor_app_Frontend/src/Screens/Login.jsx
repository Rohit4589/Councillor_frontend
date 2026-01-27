import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 🔴 will be used later
import { loginApi } from "../api/authApi"; // adjust path if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /* ===============================
     LOGIN HANDLER
     =============================== */

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginApi({
      email,
      password,
    });

    const { token, user, session_expiry } = res.data.data;
    const { role, ward_id, id } = user;

    // 🔐 Store auth data
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("wardId", ward_id);
    localStorage.setItem("userId", id);
    localStorage.setItem("sessionExpiry", session_expiry);

    const normalizedRole = role?.toLowerCase();

    if (normalizedRole === "super_admin") {
      navigate("/super/councillor");
    } else if (normalizedRole === "councillor_admin") {
      navigate("/dashboard");
    } else {
      alert(`Unauthorized role: ${role}`);
    }
  } catch (error) {
    console.error(error);
    alert("Invalid email or password");
  }
};


  /* ===============================
       TEMP SIMPLE LOGIN (NO BACKEND)
       =============================== */

  // Dummy auth data for now

  // Dummy auth data for now
  //   const role = email.includes("super")
  //     ? "SUPER_ADMIN"
  //     : "WARD_ADMIN";

  //   localStorage.setItem("token", "dev-token");
  //   localStorage.setItem("role", role);
  //   localStorage.setItem("wardId", "WARD_01");
  //   localStorage.setItem("userId", "USER_01");

  //   // 🔥 ROLE BASED REDIRECT
  //   if (role === "SUPER_ADMIN") {
  //     navigate("/super/councillor");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0b3c5d",
        overflow: "hidden",
      }}
    >
      <div className="text-center w-100">
        {/* Header */}
        <div className="mb-4 text-white">
          <img
            src={logo}
            alt="Ward Admin Logo"
            className="mb-3"
            style={{
              width: 60,
              height: 60,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />

          <h4 className="mb-1" style={{ fontWeight: 400 }}>
            Ward Admin Portal
          </h4>
          <p className="small opacity-75">
            Citizen Complaint Management System
          </p>
        </div>

        {/* Login Card */}
        <div
          className="card shadow mx-auto"
          style={{ maxWidth: 400, borderRadius: 20 }}
        >
          <form className="card-body p-4" onSubmit={handleLogin}>
            <h6 className="text-start mb-3" style={{ fontWeight: 400 }}>
              Login to Dashboard
            </h6>

            {/* Email */}
            <div className="mb-3 text-start">
              <label className="form-label text-muted small">
                Email Address
              </label>

              <div className="custom-input">
                <i className="bi bi-envelope-fill"></i>
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4 text-start">
              <label className="form-label text-muted small">Password</label>

              <div className="custom-input">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
