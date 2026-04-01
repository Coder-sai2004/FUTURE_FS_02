const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: String,

    source: {
        type: String,
        default: "Website"
    },

    status: {
        type: String,
        default: "New"
    },

    notes: [
        {
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);