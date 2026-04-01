const express = require("express");

const router = express.Router();

const {
    createLead,
    getLeads,
    updateLead,
    deleteLead,
    addNote
} = require("../controllers/leadController");


const authMiddleware = require("../middleware/authMiddleware");


router.use(authMiddleware);

router.post("/", createLead);

router.get("/", getLeads);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

router.post("/:id/notes", addNote);

module.exports = router;