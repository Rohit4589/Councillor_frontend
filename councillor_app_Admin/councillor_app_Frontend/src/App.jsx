import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Screens/Login";
import MainLayout from "./Layout/MainLayout";

import Councillor from "./Screens/Councillor";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page (no sidebar/layout) */}
        <Route path="/login" element={<Login />} />

        {/* Main App Layout */}
        <Route element={<MainLayout />}>
          <Route path="/councillor" element={<Councillor/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
