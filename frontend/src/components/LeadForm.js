import React, { useState } from "react";
import { createLead } from "../services/api";

function LeadForm({ refreshLeads, onClose }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        source: "Website"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // validation
        if (!form.name || !form.email || !form.phone) {
            alert("Please fill all required fields (*)");
            return;
        }

        try {

            await createLead(form);

            alert("Lead added successfully!");

            setForm({
                name: "",
                email: "",
                phone: "",
                source: "Website"
            });

            refreshLeads();

            if (onClose) {
                onClose(); // close modal
            }

        } catch (error) {
            alert("Error adding lead");
        }
    };

    return (

        <form
            className="lead-form"
            onSubmit={handleSubmit}
        >

            <h3 className="form-title">
                Add Lead
            </h3>

            <div className="form-fields">

                <div className="input-group">
                    <label>Name *</label>
                    <input
                        className="form-input"
                        name="name"
                        placeholder="Enter name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Email *</label>
                    <input
                        className="form-input"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Phone *</label>
                    <input
                        className="form-input"
                        name="phone"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Source</label>
                    <select
                        className="form-select"
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                    >
                        <option>Website</option>
                        <option>LinkedIn</option>
                        <option>Referral</option>
                    </select>
                </div>

                <button
                    className="add-lead-button"
                    type="submit"
                >
                    Add Lead
                </button>

            </div>

        </form>
    );
}

export default LeadForm;