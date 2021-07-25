const express = require("express");
const people = require("../routes/person");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/person", people);
};
