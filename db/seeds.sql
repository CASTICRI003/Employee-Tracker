INSERT INTO department(name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 55000, 1),
       ("Salesperson", 45000, 1),
       ("Lead Engineer", 100000, 2),
       ("Software Engineer", 75000, 2),
       ("Account Manager", 95000, 3),
       ("Accountant", 80000, 3),
       ("Legal Team Lead", 120000, 4),
       ("Lawyer", 100000, 4);

       INSERT INTO employee (first_name, last_name, role_id, manager_id)
       VALUES ("Joe", "Mama", 1, 1),
              ("Robert", "Plant", 1, 2),
              ("Jimi", "Hendrix", 2, 3),
              ("Lou", "Reed", 2, 2),
              ("Josh", "Homme", 3, 1),
              ("Roronoa", "Zoro", 5, 3),
              ("Theo", "Von", 6, 5),
              ("Reggie", "Miller", 3, 4);