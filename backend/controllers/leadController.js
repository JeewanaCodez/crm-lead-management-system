const db = require("../config/db");


// CREATE LEAD
exports.createLead = (req, res) => {

    const {
        lead_name,
        company_name,
        email,
        phone,
        lead_source,
        assigned_salesperson,
        status,
        estimated_deal_value
    } = req.body;

    const sql = `
        INSERT INTO leads
        (
            lead_name,
            company_name,
            email,
            phone,
            lead_source,
            assigned_salesperson,
            status,
            estimated_deal_value
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            lead_name,
            company_name,
            email,
            phone,
            lead_source,
            assigned_salesperson,
            status,
            estimated_deal_value
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Failed to create lead"
                });
            }

            res.status(201).json({
                message: "Lead created successfully",
                leadId: result.insertId
            });

        }
    );

};


// GET ALL LEADS
exports.getAllLeads = (req, res) => {

    let sql = "SELECT * FROM leads WHERE 1=1";

    const values = [];

    // FILTER BY STATUS
    if (req.query.status) {
        sql += " AND status = ?";
        values.push(req.query.status);
    }

    // FILTER BY LEAD SOURCE
    if (req.query.source) {
        sql += " AND lead_source = ?";
        values.push(req.query.source);
    }

    // FILTER BY SALESPERSON
    if (req.query.salesperson) {
        sql += " AND assigned_salesperson = ?";
        values.push(req.query.salesperson);
    }

    // SEARCH
    if (req.query.search) {

        sql += `
            AND (
                lead_name LIKE ?
                OR company_name LIKE ?
                OR email LIKE ?
            )
        `;

        const searchValue = `%${req.query.search}%`;

        values.push(searchValue);
        values.push(searchValue);
        values.push(searchValue);
    }

    sql += " ORDER BY created_at DESC";

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch leads"
            });
        }

        res.json(result);

    });

};


// GET SINGLE LEAD
exports.getSingleLead = (req, res) => {

    const leadId = req.params.id;

    const sql = "SELECT * FROM leads WHERE id = ?";

    db.query(sql, [leadId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Failed to fetch lead"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        res.json(result[0]);

    });

};


// UPDATE LEAD
exports.updateLead = (req, res) => {

    const leadId = req.params.id;

    const {
        lead_name,
        company_name,
        email,
        phone,
        lead_source,
        assigned_salesperson,
        status,
        estimated_deal_value
    } = req.body;

    const sql = `
        UPDATE leads
        SET
            lead_name = ?,
            company_name = ?,
            email = ?,
            phone = ?,
            lead_source = ?,
            assigned_salesperson = ?,
            status = ?,
            estimated_deal_value = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            lead_name,
            company_name,
            email,
            phone,
            lead_source,
            assigned_salesperson,
            status,
            estimated_deal_value,
            leadId
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Failed to update lead"
                });
            }

            res.json({
                message: "Lead updated successfully"
            });

        }
    );

};


// DELETE LEAD
exports.deleteLead = (req, res) => {

    const leadId = req.params.id;

    const sql = "DELETE FROM leads WHERE id = ?";

    db.query(sql, [leadId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Failed to delete lead"
            });
        }

        res.json({
            message: "Lead deleted successfully"
        });

    });

};