var express = require("express");
const books = require("./routes/books");
const auth = require("./routes/auth");
const users = require("./routes/users");

var Api = express();
Api.use(express.json());
Api.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//embed routes
Api.use("/books", books);
Api.use("/auth", auth);
Api.use("/users", users);

//configure port to listen to
Api.listen(3000);
