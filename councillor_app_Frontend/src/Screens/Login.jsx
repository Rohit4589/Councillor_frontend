import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /* ===============================
     LOGIN HANDLER
     =============================== */
  const handleLogin = async () => {
    /*
    🔴 BACKEND AUTH VERSION (ENABLE LATER)
    -------------------------------------
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Navigate only on success
      navigate("/dashboard");
      return;
    } catch (err) {
      alert("Invalid credentials");
      return;
    }
    */

    /* ===============================
       TEMP SIMPLE LOGIN (NO VALIDATION)
       =============================== */

    // Optional: store dummy token for protected routes testing
    localStorage.setItem("token", "dev-token");

    // Always navigate
    navigate("/dashboard");
  };

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
          <div className="card-body p-4">
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

            <button
              type="button"
              className="btn w-100 py-2 text-white"
              style={{
                borderRadius: 12,
                backgroundColor: "#0b3c5d",
                borderColor: "#0b3c5d",
                fontWeight: 300,
              }}
              onClick={handleLogin}
            >
              Login to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
