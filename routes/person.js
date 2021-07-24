const { Person, validate } = require("../models/person-model");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const people = await Person.find();
  res.send(people);
});

router.get("/:id", auth, validateObjectId, async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person || person.length === 0)
    return res.status(404).send("Person does not exist!");

  res.send(person);
});

router.get("/get/:name", auth, async (req, res) => {
  const p = new RegExp(req.params.name, "i");
  const person = await Person.find({ name: p });
  if (person.length === 0)
    return res.status(404).send("Person does not exist!");

  res.send(person);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    name,
    place,
    contact,
    birth,
    age,
    likes,
    dislikes,
    occupation,
    lastseen,
    nextcontact,
    notes,
    tags,
    createdAt,
    editedAt,
  } = req.body;

  const person = new Person({
    name,
    place,
    contact,
    birth,
    age,
    likes,
    dislikes,
    occupation,
    lastseen,
    nextcontact,
    notes,
    tags,
    createdAt,
    editedAt,
  });

  await person.save();
  res.send(person);
});

router.put("/:id", auth, validateObjectId, async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) return res.status(404).send("Person does not exist!");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Person.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        place: req.body.place,
        contact: req.body.contact,
        birth: req.body.birth,
        age: req.body.age,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        occupation: req.body.occupation,
        lastseen: req.body.lastseen,
        nextcontact: req.body.nextcontact,
        notes: req.body.notes,
        tags: req.body.tags,
      },
    }
  );
  res.send(result);
});

router.delete("/:id", auth, validateObjectId, async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) return res.status(404).send("Person does not exist!");

  const result = await Person.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
