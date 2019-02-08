var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  connection.query(
    "SELECT * from products",
    
    function(err, res) {
      console.log(res); 
      start();
    }
  );

  // run the start function after the connection is made to prompt the user
 
});

function start() {
    inquirer
      .prompt([{
        name: "productSelect",
        type: "input",
        message: "Which product ID would you like to select?",
      },
      {
        name: "quantSelect",
        type: "input",
        message: "How many would you like to purchase?",
      }])
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        console.log(answer);
        connection.query(
            "SELECT * from products WHERE unique_id=?", [answer.productSelect],
            
            function(err, res) {
              console.log(res); 
            }
          );
      });
  }