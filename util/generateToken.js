const jwt = require("jsonwebtoken");

exports.generateToken = function (user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
};
