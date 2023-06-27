// for configuration
const mysql = require("mysql2");
const dotenv = require("dotenv");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || dotenv.config().parsed.DB_HOST,
  user: process.env.DB_USER || dotenv.config().parsed.DB_USER,
  password: process.env.DB_PASSWORD || dotenv.config().parsed.DB_PASSWORD,
  database: process.env.DB_DATABASE || dotenv.config().parsed.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    console.log(err);
    return;
  }
  console.log("Connection established");
});

module.exports = connection;
