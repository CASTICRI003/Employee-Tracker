const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!bK4?P4!&z?JFKPj',
    database: 'employees_db'
});

module.exports = db;