const db = require("../config/db");


// ADD NOTE
exports.addNote = (req, res) => {

    const leadId = req.params.id;

    const { note_content, created_by } = req.body;

    const sql = `
        INSERT INTO notes (lead_id, note_content, created_by)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [leadId, note_content, created_by], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed to add note" });
        }

        res.status(201).json({
            message: "Note added successfully"
        });

    });

};


// GET NOTES FOR A LEAD
exports.getNotesByLead = (req, res) => {

    const leadId = req.params.id;

    const sql = `
        SELECT * FROM notes
        WHERE lead_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [leadId], (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Failed to fetch notes" });
        }

        res.json(result);

    });

};