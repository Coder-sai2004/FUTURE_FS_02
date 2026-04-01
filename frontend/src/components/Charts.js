import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function Charts({ leads }) {

    const newCount = leads.filter(l => l.status === "New").length;
    const contacted = leads.filter(l => l.status === "Contacted").length;
    const converted = leads.filter(l => l.status === "Converted").length;

    const pieData = [
        { name: "New", value: newCount },
        { name: "Contacted", value: contacted },
        { name: "Converted", value: converted }
    ];

    const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

    const monthlyLeads = {};

    leads.forEach((lead) => {

        const date = new Date(lead.createdAt);
        const month = date.toLocaleString("default", { month: "short" });

        if (!monthlyLeads[month]) {
            monthlyLeads[month] = 0;
        }

        monthlyLeads[month]++;

    });

    const lineData = Object.keys(monthlyLeads).map((month) => ({
        month,
        leads: monthlyLeads[month]
    }));

    return (

        <div className="charts-container">

            <div className="chart-card">

                <h3 className="chart-title">
                    Lead Distribution
                </h3>

                <div className="pie-wrapper">

                    <PieChart width={350} height={260}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>

                    {/* legend */}
                    <div className="pie-legend">

                        <div className="legend-item">
                            <span className="legend-color new"></span>
                            New
                        </div>

                        <div className="legend-item">
                            <span className="legend-color contacted"></span>
                            Contacted
                        </div>

                        <div className="legend-item">
                            <span className="legend-color converted"></span>
                            Converted
                        </div>

                    </div>

                </div>

            </div>

            <div className="chart-card">

                <h3 className="chart-title">
                    Leads Over Time
                </h3>

                <LineChart width={500} height={300} data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#6366f1" />
                </LineChart>

            </div>

        </div>

    );
}

export default Charts;