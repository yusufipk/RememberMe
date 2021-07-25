const mongoose = require("mongoose");

module.exports = function () {
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
};
