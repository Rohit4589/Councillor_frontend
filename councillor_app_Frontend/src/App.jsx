import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Screens/Login";
import MainLayout from "./Layout/MainLayout";

import Dashboard from "./Screens/Dashboard";
import Categories from "./Screens/Categories";
import Citizens from "./Screens/Citizens";
import Complaints from "./Screens/Complaints";
import Officers from "./Screens/Officers";
import CreateEvent from "./Screens/CreateEvent";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/citizens" element={<Citizens />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
