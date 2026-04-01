import React, { useState } from "react";
import { updateLeadStatus, deleteLead, addNote } from "../services/api";

function LeadTable({ leads, refreshLeads }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const changeStatus = async (id, status) => {
        await updateLeadStatus(id, status);
        refreshLeads();
    };

    const removeLead = async (id) => {
        await deleteLead(id);
        refreshLeads();
    };

    const addLeadNote = async (id) => {
        const note = prompt("Enter note");
        if (!note) return;

        await addNote(id, note);
        refreshLeads();
    };

    const filteredLeads = leads
        .filter((lead) =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((lead) =>
            statusFilter === "All" ? true : lead.status === statusFilter
        );

    const getInitials = (name) => {
        const names = name.split(" ");
        return names.map(n => n[0]).join("").toUpperCase();
    };


    return (

        <div className="lead-table-container">

            <div className="lead-table-controls">

                <div className="lead-filter">
                    <label>Status:</label>

                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                    </select>

                </div>

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            <table className="lead-table">

                <thead>
                    <tr>
                        <th>Lead</th>
                        <th>Phone</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {filteredLeads.map((lead) => (

                        <tr key={lead._id}>

                            <td className="lead-name">

                                <div className="avatar">
                                    {getInitials(lead.name)}
                                </div>

                                <div className="lead-info">
                                    <div className="lead-fullname">{lead.name}</div>
                                    <div className="lead-email">{lead.email}</div>
                                </div>

                            </td>

                            <td>{lead.phone}</td>
                            <td>{lead.source}</td>

                            <td>

                                <td>

                                    <select
                                        className={`status-dropdown ${lead.status.toLowerCase()}`}
                                        value={lead.status}
                                        onChange={(e) =>
                                            changeStatus(lead._id, e.target.value)
                                        }
                                    >
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Converted">Converted</option>
                                    </select>

                                </td>

                            </td>

                            <td>

                                <button
                                    className="note-button"
                                    onClick={() => addLeadNote(lead._id)}
                                >
                                    Add
                                </button>

                                <ul className="notes-list">

                                    {lead.notes?.map((note, index) => (
                                        <li key={index}>{note.text}</li>
                                    ))}

                                </ul>

                            </td>

                            <td>

                                <button
                                    className="delete-button"
                                    onClick={() => removeLead(lead._id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default LeadTable;