const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
    try {

        const lead = new Lead(req.body);

        await lead.save();

        res.json(lead);

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getLeads = async (req, res) => {

    const leads = await Lead.find();

    res.json(leads);
};

exports.updateLead = async (req, res) => {

    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(lead);
};

exports.deleteLead = async (req, res) => {

    await Lead.findByIdAndDelete(req.params.id);

    res.json({ message: "Lead deleted" });
};

exports.addNote = async (req, res) => {

    const lead = await Lead.findById(req.params.id);

    lead.notes.push({
        text: req.body.note
    });

    await lead.save();

    res.json(lead);
};