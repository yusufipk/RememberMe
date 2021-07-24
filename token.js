const jwt = require("jsonwebtoken");
module.exports = function () {
  const token = jwt.sign({ isAdmin: true }, process.env.rememberMe_jwtKey, {
    expiresIn: "30d",
  });
  return token;
};
