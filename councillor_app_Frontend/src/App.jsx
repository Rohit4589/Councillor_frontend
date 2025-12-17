import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Screens/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
