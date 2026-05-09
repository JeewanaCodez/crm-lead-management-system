const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crm_system"
});

connection.connect((err) => {

  if (err) {
    console.error("❌ Database connection failed:");
    console.error(err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");

});

module.exports = connection;