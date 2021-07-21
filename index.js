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

//temp
// const { Person } = require("./models/person-model");

// async function createPerson() {
//   const per = new Person({
//     name: "Mike",
//     place: "Discord Eng Group",
//     contact: {
//       phone: "12345",
//       email: "123456@gmail.com",
//       socialmedia: {
//         instagram: "mike123",
//         youtube: "mike123",
//         twitter: "mike123",
//       },
//     },
//     birth: "10.05.1998",
//     age: 22,
//     likes: ["football", "video games"],
//     dislikes: ["cats", "spiders"],
//     occupation: "student",
//     lastseen: "12.07.2021",
//     nextcontact: "15.07.2021",
//     notes: "He is a nice guy.",
//     tags: ["student", "programmer", "father", "mother", "brother", "doctor"],
//   });
//   const result = await per.save();
//   console.log(result);
// }

const port = process.env.port || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
