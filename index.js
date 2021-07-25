const express = require("express");
const mongoose = require("mongoose");
const app = express();

if (process.env.NODE_ENV === "test") {
  mongoose
    .connect("mongodb://localhost:27017/remembermetest", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB test..."));
} else {
  mongoose
    .connect(`mongodb://localhost:27017/rememberme`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB", err));
}

const people = require("./routes/person");

app.use(express.json());
app.use("/api/person", people);

const { logger } = require("./startup/logging");

const port = process.env.port || 3002;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

module.exports = server;
