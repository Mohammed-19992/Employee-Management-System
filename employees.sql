CREATE database employees;
USE employees;

create table department(
	id int not null auto_increment,
    name varchar(30),
    primary key(id)
);

create table role(
	id int not null auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    primary key(id),
    index(department_id),
    foreign key(department_id)
		references department(id)
);

create table employee(
	id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key(id),
    index(role_id),
    index(manager_id),
    foreign key(role_id)
		references role(id),
	foreign key(manager_id)
		references employee(id)
);

insert into department(name)
values ("Sales");

insert into department(name)
values ("Engineering");

insert into department(name)
values ("Finance");

insert into department(name)
values ("Legal");

insert into role(title,salary,department_id)
value ("Sales Lead", 100000, (select id from department where name="Sales"));

insert into role(title,salary,department_id)
value ("Salesperson", 80000, (select id from department where name="Sales"));

insert into role(title,salary,department_id)
value ("Lead Engineer", 150000, (select id from department where name="Engineering"));

insert into role(title,salary,department_id)
value ("Software Engineer", 120000, (select id from department where name="Engineering"));

insert into role(title,salary,department_id)
value ("Accountant", 125000, (select id from department where name="Finance"));

insert into role(title,salary,department_id)
value ("Legal Team Lead", 250000, (select id from department where name="Legal"));

insert into role(title,salary,department_id)
value ("Lawyer", 190000, (select id from department where name="Legal"));
