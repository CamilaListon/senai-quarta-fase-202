
import mysql from require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senai',
  database: 'gestao_frota',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;