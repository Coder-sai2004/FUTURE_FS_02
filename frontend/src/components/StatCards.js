import React from "react";
import { Users, UserPlus, PhoneCall, TrendingUp } from "lucide-react";

function StatCards({ leads }) {

    const total = leads.length;
    const contacted = leads.filter(l => l.status === "Contacted").length;
    const converted = leads.filter(l => l.status === "Converted").length;
    const newLeads = leads.filter(l => l.status === "New").length;

    return (

        <div className="stats-grid">

            <Card
                title="Total Leads"
                value={total}
                icon={<Users />}
            />

            <Card
                title="New Leads"
                value={newLeads}
                icon={<UserPlus />}
            />

            <Card
                title="Contacted"
                value={contacted}
                icon={<PhoneCall />}
            />

            <Card
                title="Converted"
                value={converted}
                icon={<TrendingUp />}
            />

        </div>

    );
}

function Card({ title, value, icon }) {

    return (

        <div className="stat-card">

            <div className="stat-icon">
                {icon}
            </div>

            <div>

                <h3 className="stat-title">
                    {title}
                </h3>

                <h2 className="stat-value">
                    {value}
                </h2>

            </div>

        </div>

    );
}

export default StatCards;