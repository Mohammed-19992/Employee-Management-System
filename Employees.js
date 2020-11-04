// Connecting to mysql
const mysql = require("mysql2");
// Connecting to inquirer
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  // Your host
  host: "localhost",
  // Your username
  user: "root",
  // Your password 
  password: "",
  // Your database
  database: "employees",
});

// Connecting to Console table
const consoleTable = require("console.table");

connection.connect(error => {
  if (error) throw error;
      console.log("The Employee Management System app is starting...");

    mainMenu();
})

// User Inquirer for User prompts

function mainMenu() {
  inquirer
  .prompt(
    {name: "menu", type: "list", message: "Please, choose from the below list what you would like this app to do for you?", choices: [
        "View Departments:",
        "View Roles:",
        "View Employees:",
        "Add Departments:",
        "Add Roles:",
        "Add Employees:",
        "Update Employees' Roles:",
        new inquirer.Separator(),
        "Exit this App..."]
    }
  )
  .then((choice) => {
    // Switching between functions depending on user selection
    switch (choice.menu) {
      case "View Departments:":
        viewDepartments();
        break;
      case "View Roles:":
        viewRoles();
        break;
      case "View Employees:":
        viewEmployees();
        break;
      case "Add Departments:":
        addDepartments();
        break;
      case "Add Roles:":
        addRoles();
        break;
      case "Add Employees:":
        addEmployees();
        break;
      case "Update Employees' Roles:":
        updateRoles();
        break;
      case "Exit this App...":
        console.log("Thanks for using this app \u2665  \u2665  \u2665!");
        connection.end();
        process.exit();
      }
  })
};

// Function for viewing departments
function viewDepartments() {
  connection.query('SELECT * FROM department', (error, response) => {
      if (error) throw error;
      console.table(response);
      mainMenu();
  })
};


// Function for viewing roles
function viewRoles() {
  connection.query("SELECT * FROM role", (error, response) => {
      if (error) throw error;
      console.table(response);
      mainMenu();
  })
};

// Function for viewing employees
function viewEmployees() {
  connection.query('SELECT * FROM employee', (error, response) => {
      if (error) throw error;
      console.table(response);
      mainMenu();
  })
};
// Function for adding departments
function addDepartments() {
  inquirer
  .prompt ({type: "input", message: "Please enter the department name:", name: "newDeptName"})
  .then(function(choice) {
    // Inserting to the database
    connection.query("INSERT INTO department (name) VALUES (?)", [choice.newDeptName], function(error, response) {
      if (error) throw error;
      console.table(response)
      mainMenu();
    })
  })
};

// Function for adding roles
function addRoles() {
  inquirer
  .prompt ([
    {type: "input", message: "Please enter the name of the new role:", name: "newRoleName"},
    {type: "input", message: "Please enter the salary amount for the new role:", name: "newRoleSalary"},
    {type: "input", message: "Please enter the department ID for the new role:", name: "newDeptId"}
  ])
  .then(function(choice) {
    // Inserting to the database
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
    [choice.newRoleName, choice.newRoleSalary, choice.newDeptId], function(error, response) {
      if (error) throw error;
      console.table(response);
      mainMenu();
    }
  )})
};

// Function for adding an employee
function addEmployees() {
  inquirer
  .prompt([
    {type: "input", message: "Please enter the employee's first name:", name: "newFirstName"},
    {type: "input", message: "Please enter the employee's last name:", name: "newLastName"},
    {type: "input", message: "Please enter the employee's role ID number:", name: "newRoleId"},
    {type: "input", message: "Please enter the manager's ID number:", name: "newManagerId"}
  ]).then(function(choice) {
    // Inserting into the database
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
    [choice.newFirstName, choice.newLastName, choice.newRoleId, choice.newManagerId], function(error, response) {
      if (error) throw error;
      console.table(response);
      mainMenu();
    }
 )})
};

// Function for updating employee Role
function updateRoles() {
  inquirer
  .prompt ({name: "employeeId", type: "input", message: "Please enter the ID of the employee you wish to update:"})
  .then(function(choice) {
    var employeeId = choice.employeeId;
    inquirer.prompt({name: "newRoleId", type: "input", message: "Please enter the new role ID for this employee:"})
    .then(function(choice) {
      // Update employee record
      var newRoleId = choice.newRoleId;
      var request = "UPDATE employee SET role_id=? WHERE id=?";
      connection.query(request, [newRoleId, employeeId], function(err, response) {
        if(error) throw error;
        console.table(response);
        mainMenu();
      })
    })
  })
};