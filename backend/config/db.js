const mysql = require("mysql2");
require("dotenv").config();

// Parse MySQL URL from environment variable
const mysqlUrl = process.env.MYSQL_URL || "mysql://root:@localhost:3306/crm_system";

// Parse the URL to extract connection details
const urlRegex = /mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)/;
const match = mysqlUrl.match(urlRegex);

let connectionConfig;

if (match) {
  const [, user, password, host, port, database] = match;
  connectionConfig = {
    host,
    user,
    password: password || "",
    database,
    port: parseInt(port),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  console.error("❌ Invalid MYSQL_URL format. Use: mysql://user:password@host:port/database");
  process.exit(1);
}

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {

  if (err) {
    console.error("❌ Database connection failed:");
    console.error(err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
  console.log(`📊 Database: ${connectionConfig.database}`);

});

module.exports = connection;