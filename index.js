const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(`mongodb://localhost:27017/rememberme`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB", err));

const people = require("./routes/person");

app.use(express.json());
app.use("/api/person", people);

const port = process.env.port || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
