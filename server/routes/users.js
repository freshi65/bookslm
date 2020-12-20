const { sendMail } = require("../mail/mail");
const { db } = require("../db");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

/**
 * Register a user in the DB.
 */
router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password, role } = req.body;
  var status = 200;
  const passwordHash = bcrypt.hashSync(password);
  db.query(
    "SELECT email FROM users WHERE email =?",
    [email],
    (error, results) => {
      if (error) {
        //internal error
        status = 500;
      } else if (results.length > 0) {
        //user already exists
        status = 409;
      } else {
        db.query("INSERT INTO users SET ?", {
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash: passwordHash,
          role: role,
        });
        sendMail(email, firstName + " " + lastName);
      }
      res.status(status).end();
    }
  );
});

module.exports = router;
