import React, { useEffect, useState } from "react";
import { getLeads } from "../services/api";
import StatCards from "../components/StatCards";
import Charts from "../components/Charts";

function Dashboard() {

    const [leads, setLeads] = useState([]);

    const fetchLeads = async () => {
        const res = await getLeads();
        setLeads(res.data);
    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }

        fetchLeads();

    }, []);

    return (

        <div className="dashboard-page">

            <div className="dashboard-container">

                <h1 className="dashboard-title">
                    Dashboard
                </h1>

                <StatCards leads={leads} />

                <Charts leads={leads} />

            </div>

        </div>

    );
}

export default Dashboard;