import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

function Navbar() {

    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (

        <div className="sidebar">

            <div className="sidebar-top">

                <h2 className="sidebar-logo">
                    LeadFlow
                </h2>

                <p className="sidebar-subtitle">
                    CRM Dashboard
                </p>

                <div className="sidebar-links">

                    <Link
                        to="/dashboard"
                        className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/leads"
                        className={`sidebar-link ${location.pathname === "/leads" ? "active" : ""}`}
                    >
                        <Users size={18} />
                        Leads
                    </Link>

                </div>

            </div>

            <div className="sidebar-bottom">

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <LogOut size={18} />
                    Logout
                </button>

            </div>

        </div>

    );
}

export default Navbar;