import React, { useEffect, useState } from "react";
import LeadTable from "../components/LeadTable";
import LeadForm from "../components/LeadForm";
import { getLeads } from "../services/api";
import "../styles/dashboard.css";

function Leads() {

    const [leads, setLeads] = useState([]);
    const [showForm, setShowForm] = useState(false);

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

        <div className="leads-page">

            <div className="leads-container">

                <div className="leads-header">

                    <h1 className="leads-title">
                        Leads
                    </h1>

                    <button
                        className="add-lead-btn"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Lead
                    </button>

                </div>

                <LeadTable
                    leads={leads}
                    refreshLeads={fetchLeads}
                />

            </div>

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <button
                            className="modal-close"
                            onClick={() => setShowForm(false)}
                        >
                            ✕
                        </button>

                        <LeadForm
                            refreshLeads={fetchLeads}
                            onClose={() => setShowForm(false)}
                        />

                    </div>

                </div>

            )}

        </div>

    );
}

export default Leads;