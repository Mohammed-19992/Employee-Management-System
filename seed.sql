USE employees;

INSERT INTO department (name)
VALUES
("Finance"),
("Technology"),
("Legal"),
("Administration");

INSERT INTO role (title, salary, department_id)
VALUES
("Accountant", 30000, 1),
("CFO", 700000, 1),
("Controller", 100000, 1),
("Data Scientist", 50000, 2),
("Software Engineer", 130000, 2),
("Lawyer", 140000, 3),
("IT Support", 20000, 2),
("Office Administrator", 40000, 4);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Sarah", "Fiona", 1, null),
("Jason", "Row", 2, 1),
("Stephanie", "Jasmin", 3, null),
("Mohammed", "Gaza", 4, 1),
("Ahmed", "Saber", 5, null),
("Linda", "Saraya", 6, 2),
("Samah", "Arafat", 7, null),
("Faress", "Hamed", 8, null);

