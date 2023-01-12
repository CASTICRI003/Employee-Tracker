const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection');


db.connect(err => {
    if (err) throw err;
    console.log(`Server runnning on 3001`);
    intro();
});

function intro() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: [
        'Add Employee',
        'Add Derpartment',
        'Add Role',
        'Update Employee Role',
        'View All Roles',
        'View All Departments',
        'View All Employees',
        'Quit']
        }
    ).then(answer => {
        switch (answer.intro) {
            case 'Add Employee':
                addEmp();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                upRole();
                break;
            case 'View All Roles':
                viewRole();
                break;
            case 'View All Departments':
                viewDept();
                break;
            case 'View All Employees':
                viewEmp();
                break;
            default:
                db.end();
        }
    })
};


function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: [''],
        },
        {
            type: 'list',
            name: 'mng',
            message: "Who is the employee's manager?",
            choices: [''],
        },
    ]).then(answer => {
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
    });
};