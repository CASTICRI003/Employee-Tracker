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
    let roleChoice = [];
    let roleQuery = 'SELECT title FROM role';
    db.query(roleQuery, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            roleChoice.push({ name: res[i].title, value: res[i].id });
        }
    });
    let mngChoice = [];
    let mngQuery = 'SELECT * FROM employee WHERE manager_id IS null';
    db.query(mngQuery, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            mngChoice.push({ name: res[i].first_name + " " + res[i].last_name, value: res[i].id});
        }
    });;
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
        db.promise().query("INSERT INTO employee (first_name, last_name, role-id, manager_id) VALUES(?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.role, answer.mng]);
        console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
        intro();
    });
};

function addDept() {
    
};



function addRole() {
    let dptChoice = [];
    let dptquery = 'SELECT * FROM department';
    db.query(dptquery, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            dptChoice.push({ name: res[i].name, value: res[i].id });
        }
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'nameRole',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'dept',
            message: 'Which department does this role belong to?',
            choices: dptChoice,
        },
    ]).then(answer => {
        db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (answer.nameRole, answer.salary, answer.dept");
        console.log(`Added ${answer.nameRole} to the database`);
    });
};




function upRole() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'emp',
            message: "Which employee's role do you want to update?",
            choices: [''],
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: [''],
        },
    ]).then(answer => {
        console.log(`Updated ${answer.emp}'s role`);
    });
};


function viewRole() {
    db.promise().query("SELECT rl.id, rl.title, dpt.name AS department, rl.salary FROM role AS rl JOIN department AS dpt ON rl.department_id = dpt.id")
    .then(([rows, fields]) => {
        console.table(rows);
        intro();
    })
    .catch(err => console.log(err));
};


function viewDept() {
    db.promise().query("SELECT * FROM departments")
    .then(([rows, fields]) => {
        console.table(rows);
        intro();
    })
    .catch(err => console.log(err));
};


function viewEmp() {
    db.promise().query("SELECT emp.id, emp.first_name, emp.last_name, rl.title, dpt.name AS department, rl.salary FROM employee AS emp JOIN role AS rl ON rl.id = emp.role_id JOIN department AS dpt ON dpt.id = rl.department_id")
    .then(([rows, fields]) => {
        console.table(rows);
        intro();
    })
    .catch(err => console.log(err));
};