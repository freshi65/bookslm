const router = require("express").Router();

const auth = require("../passport");
const { db } = require("../db");

/**
 * Add a book to the DB.
 */
router.post("/add", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (user) => {
    const { title, author, publisher, published, borrowed } = req.body;

    var status = 200;
    db.query(
      "SELECT title FROM books WHERE title =?",
      [title],
      (error, results) => {
        if (error) {
          //internal error

          status = 500;
        }
        if (results.length > 0) {
          //book already exists
          status = 409;
        } else {
          db.query("INSERT INTO books SET ?", {
            title: title,
            author: author,
            publisher: publisher,
            published: published,
            borrowed: borrowed,
          });
        }
        res.status(status).end();
      }
    );
  });
});

/**
 * Return a book, so its available for other users
 */
router.post("/return", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (user) => {
    const { title } = req.body;
    date = new Date(Date.now()).toDateString();

    db.query(
      "UPDATE books SET borrowed = false,borrowedBy = NULL,borrowId = NULL,borrowDate = NULL WHERE title = ?",
      [title],
      (error, results) => {
        if (error) {
          res.status(500).end();
        } else {
          res.send(results);
        }
      }
    );
  });
});
/**
 * Set borrow status for a book.
 */
router.post("/borrow", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (user) => {
    const { title } = req.body;
    date = new Date(Date.now()).toDateString();

    db.query(
      "UPDATE books SET borrowed = ?,borrowedBy = ?,borrowId = ?,borrowDate = ? WHERE title = ?",
      [true, user.firstName + " " + user.lastName, user.idusers, date, title],
      (error, results) => {
        if (error) {
          res.status(500).end();
        } else {
          res.send(results);
        }
      }
    );
  });
});
/**
 *Delete a book in the DB.
 */
router.delete("/delete", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (user) => {
    const title = req.query.title;

    //check on server site if user has permission to delete books
    if (user.role == "librarian") {
      db.query(
        "DELETE FROM books WHERE title = ?",
        [title],
        (error, results) => {
          if (error) {
            res.status(500).end();
          } else {
            res.send(results);
          }
        }
      );
    } else {
      res.status(403).end();
    }
  });
});

/**
 *Query myBooks from DB.
 */
router.get("/myBooks", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (user) => {
    db.query(
      "SELECT * FROM books WHERE borrowId= ?",
      [user.idusers],
      (error, results) => {
        if (error) {
          res.status(500).end();
        } else {
          res.send({ books: results, role: user.role });
        }
      }
    );
  });
});
/**
 *Query all books from DB.
 */
router.get("*", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (user) => {
    db.query("SELECT * FROM books", (error, results) => {
      if (error) {
        res.status(500).end();
      } else {
        res.send({ books: results, role: user.role });
      }
    });
  });
});

module.exports = router;
