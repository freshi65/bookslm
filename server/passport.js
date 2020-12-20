const SECRET = "changeThisToAStrongSecret";

const bcrypt = require("bcryptjs");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwt = require("jsonwebtoken");
const { db } = require("./db");

// HTTP-Basic authentication with email / password
// the user's credentials are transmitted by the client in the
// HTTP Authorization header
passport.use(
  new BasicStrategy((email, password, done) => {
    // get the user from the DB by email
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        //check if user exist and if password is correct
        if (
          !results ||
          !bcrypt.compareSync(password, results[0].passwordHash)
        ) {
          return done(null, false);
        } else {
          console.log(`user ${email} logged in`);
          return done(null, results[0]);
        }
      }
    );
  })
);

// JWT Authentication with JSON Web Token

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: SECRET,
    },
    (jwtPayload, done) => {
      // the payload of the JWT has been extracted successfully by the extractor
      // note: the extractor checks if the token is expired. In this case, passport
      // sends 401 to the client and we don't reach this point in the code
      console.log("valid JWT received:");
      console.log(jwtPayload);

      //check if user exists in DB
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [jwtPayload.email],
        async (error, results) => {
          //user doesn't exist
          if (!results) {
            return done(null, false);
            //user doesn't exist
          } else {
            console.log(
              `user ${jwtPayload.email} was authenticated by a valid JWT`
            );
            return done(null, results[0]);
          }
        }
      );
    }
  )
);

exports.authenticateJWT = (req, res, next, callback) => {
  passport.authenticate("jwt", (err, id) => {
    // Responds with HTTP response status code 500 if an internal server error
    // has occurred.
    if (err) res.status(500).end();
    // Responds with HTTP response status code 401 if the user couldn't be
    // authenticated.
    else if (!id) res.status(401).end();
    // Invokes the callback function if the user was successfully authenticated.
    else callback(id);
  })(req, res, next);
};

exports.authenticateBASIC = (req, res, next, callback) => {
  passport.authenticate("basic", (err, id) => {
    // Responds with HTTP response status code 500 if an internal server error
    // has occurred.
    if (err) res.status(500).end();
    // Responds with HTTP response status code 401 if the user couldn't be
    // authenticated.
    else if (!id) res.status(401).end();
    // Invokes the callback function if the user was successfully authenticated.
    else callback(id);
  })(req, res, next);
};
/**
 * Creates JWT for authentication
 * @param {string} email users email
 * @param {string} role users role
 */
exports.createJWT = (email, role) => {
  let payload = {
    email: email,
    role: role,
  };

  // Create the JWT and sign it
  let token = jwt.sign(payload, SECRET, {
    expiresIn: "7 days",
  });
  return token;
};
