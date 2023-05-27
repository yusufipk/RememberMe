const { createLogger, format, transports } = require("winston");
require("winston-mongodb");

const mongoOptions = { useUnifiedTopology: true };

const consoleTransport = new transports.Console({
  level: "error",
  format: format.combine(format.colorize(), format.simple()),
});

const fileTransport = new transports.File({ filename: "./errors/combined.log" });

const errorFileTransport = new transports.File({ filename: "./errors/error.log", level: "error" });

const mongoTransport = new transports.MongoDB({
  db: "mongodb://localhost:27017/errorsRememberMe",
  options: mongoOptions,
});

const exceptionHandlers = [
  new transports.File({ filename: "./errors/exceptions.log" }),
  mongoTransport,
];

const rejectionHandlers = [mongoTransport];

const logger = createLogger({
  level: "info",
  format: format.combine(format.json(), format.metadata()),
  defaultMeta: { service: "user-service" },
  transports: [consoleTransport, fileTransport, mongoTransport],
  exceptionHandlers,
  rejectionHandlers,
});

exports.logger = logger;
