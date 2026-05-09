const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");


// ADD NOTE
router.post("/:id", noteController.addNote);


// GET NOTES
router.get("/:id", noteController.getNotesByLead);


module.exports = router;