const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// DATABASE
require("./config/db");


// ROUTES
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");



// API ROUTES
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
    res.send("CRM Backend Running");
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});