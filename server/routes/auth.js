const auth = require("../passport");
const router = require("express").Router();

/**
 * Authenticate with JWT token.
 */
router.post("/token", (req, res, next) => {
  auth.authenticateJWT(req, res, next, (id) => res.status(200).end());
});

/**
 * Authenticate with user credential (email, password) to receive JWT token.
 */
router.get("/token", (req, res, next) => {
  auth.authenticateBASIC(req, res, next, (id) => {
    let token = auth.createJWT(id.email, id.role);
    res.send({ token: token });
  });
});

module.exports = router;
