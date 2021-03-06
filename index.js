const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/routes")(app);
if (process.env.NODE_ENV !== "test") require("./startup/prod")(app);

const { logger } = require("./startup/logging");

const port = process.env.port || 3002;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

module.exports = server;
