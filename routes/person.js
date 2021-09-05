const { Person, validate } = require("../models/person-model");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const people = await Person.find().sort("field name");
  res.send(people);
});

router.get("/:id", auth, validateObjectId, async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person || person.length === 0)
    return res.status(404).send("Person does not exist!");

  res.send(person);
});

router.get("/get/:name", auth, async (req, res) => {
  const findName = new RegExp(req.params.name, "i");
  const person = await Person.find({ name: findName });
  if (person.length === 0)
    return res.status(404).send("Person does not exist!");

  res.send(person);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    name,
    metAt,
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
    metAt,
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

  const {
    name,
    place,
    metAt,
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
  } = person;

  if (!req.body.name) req.body.name = name;
  if (!req.body.metAt) req.body.metAt = metAt;
  if (!req.body.place) req.body.place = place;

  if (!req.body.contact.socialmedia.instagram)
    req.body.contact.socialmedia.instagram = contact.socialmedia.instagram;
  if (!req.body.contact.socialmedia.youtube)
    req.body.contact.socialmedia.youtube = contact.socialmedia.youtube;
  if (!req.body.contact.socialmedia.twitter)
    req.body.contact.socialmedia.twitter = contact.socialmedia.twitter;
  if (!req.body.contact.phone) req.body.contact.phone = contact.phone;
  if (!req.body.contact.email) req.body.contact.email = contact.email;

  if (!req.body.birth) req.body.birth = birth;
  if (!req.body.age) req.body.age = age;
  if (!req.body.likes) req.body.likes = likes;
  if (!req.body.dislikes) req.body.dislikes = dislikes;
  if (!req.body.occupation) req.body.occupation = occupation;
  if (!req.body.lastseen) req.body.lastseen = lastseen;
  if (!req.body.nextcontact) req.body.nextcontact = nextcontact;
  if (!req.body.notes) req.body.notes = notes;
  if (!req.body.tags) req.body.tags = tags;
  if (!req.body.createdAt) req.body.createdAt = createdAt;

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
