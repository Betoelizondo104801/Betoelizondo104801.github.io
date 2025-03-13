const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Base de datos conectada con pool de conexiones');
    connection.release();
});

module.exports = db;
