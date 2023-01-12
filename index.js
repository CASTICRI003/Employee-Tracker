const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection');


db.connect(err => {
    if (err) throw err;
    console.log(`Server runnning on 3001`);
    intro();
});

