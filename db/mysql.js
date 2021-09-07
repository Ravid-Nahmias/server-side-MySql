const mysql = require("mysql");
const db_config = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
  multipleStatements: true,
};

const connection = mysql.createConnection(db_config);

connection.connect((err) => {
  if (!err) console.log("MySql DB Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

module.exports = connection;
