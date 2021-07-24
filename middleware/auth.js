const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied! No token provided.");

  try {
    jwt.verify(token, process.env.rememberMe_jwtKey);
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token.");
  }
};
