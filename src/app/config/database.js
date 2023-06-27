// for configuration
const mysql = require('mysql2');
const dotenv = require('dotenv');

const connection = mysql.createConnection({
  host: dotenv.config().parsed.DB_HOST,
  user: dotenv.config().parsed.DB_USER,
  password: dotenv.config().parsed.DB_PASSWORD,
  database: dotenv.config().parsed.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database');
    console.log(err);
    return;
  }
  console.log('Connection established');
});

module.exports = connection;
