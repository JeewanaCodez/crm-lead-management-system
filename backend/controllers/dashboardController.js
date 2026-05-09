const db = require("../config/db");


// DASHBOARD STATS
exports.getStats = (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total_leads,

            SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS new_leads,

            SUM(CASE WHEN status = 'Qualified' THEN 1 ELSE 0 END) AS qualified_leads,

            SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) AS won_leads,

            SUM(CASE WHEN status = 'Lost' THEN 1 ELSE 0 END) AS lost_leads,

            SUM(estimated_deal_value) AS total_value,

            SUM(CASE WHEN status = 'Won' THEN estimated_deal_value ELSE 0 END) AS won_value

        FROM leads;
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Dashboard error" });
        }

        res.json(result[0]);

    });

};