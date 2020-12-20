const mysql = require("mysql");
// set credentials for connection to MySql DB
const db = mysql.createConnection({
  host: "localhost",
  user: "bookslm",
  password: "PGtBXtH40yidD.88zCHV",
  database: "bookslm_booksapp",
});
// try to connect to db
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySql connected");
  }
});

exports.db = db;
