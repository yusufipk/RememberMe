const winston = require("winston");
const { format } = require("winston");
const { combine } = format;
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info",
  format: combine(winston.format.json(), format.metadata()),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      level: "error",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./errors/combined.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/errorsRememberMe",
      options: { useUnifiedTopology: true },
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "./errors/exceptions.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/errorsRememberMe",
      options: { useUnifiedTopology: true },
    }),
  ],
  rejectionHandlers: [
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/errorsRememberMe",
      options: { useUnifiedTopology: true },
    }),
  ],
});

exports.logger = logger;
