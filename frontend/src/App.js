import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Leads from "./pages/Leads";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function Layout() {

  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </>
  );
}

function App() {

  return (
    <Router>
      <Layout />
    </Router>
  );

}

export default App;