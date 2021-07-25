const jwt = require("jsonwebtoken");
module.exports.createToken = function () {
  const token = jwt.sign({ isAdmin: true }, process.env.rememberMe_jwtKey, {
    expiresIn: "30d",
  });

  if (process.env.NODE_ENV !== "test") {
    console.log(token);
  }

  return token;
};
