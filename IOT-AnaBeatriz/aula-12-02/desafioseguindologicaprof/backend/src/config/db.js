
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senai',
  database: 'gestao_frota',
});

export default db;