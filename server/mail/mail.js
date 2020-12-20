const nodemailer = require("nodemailer");
// Creates a reusable transporter object using the default SMTP transport.
const transporter = nodemailer.createTransport({
  host: "bianca.uberspace.de",
  port: "587",
  secure: false,
  auth: {
    user: "bookslm@uber.space",
    pass: "BvMx3hp7LgTkZl06",
  },
});

// Send mail with a defined transport object.
exports.sendMail = async (email, FullName) => {
  const info = await transporter.sendMail({
    from: '"books@no-reply.com" <bookslm@uber.space>',
    to: email,
    subject: "Welcome to books",
    text: "Thanks for your registration " + FullName,
    html: "<div>Thanks for your registration " + FullName + "</div>",
  });

  return info;
};
