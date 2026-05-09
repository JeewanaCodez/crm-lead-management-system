const express = require("express");

const router = express.Router();

const leadController = require("../controllers/leadController");


// CREATE LEAD
router.post("/", leadController.createLead);


// GET ALL LEADS
router.get("/", leadController.getAllLeads);


// GET SINGLE LEAD
router.get("/:id", leadController.getSingleLead);


// UPDATE LEAD
router.put("/:id", leadController.updateLead);


// DELETE LEAD
router.delete("/:id", leadController.deleteLead);


module.exports = router;