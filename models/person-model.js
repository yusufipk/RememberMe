const mongoose = require("mongoose");
const Joi = require("joi");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true,
  },
  metAt: {
    type: String,
    maxlength: 50,
    required: true,
  },
  place: {
    type: String,
    maxlength: 50,
  },
  contact: {
    phone: {
      type: String,
      maxlength: 20,
    },
    email: {
      type: String,
      maxlength: 255,
    },
    socialmedia: {
      instagram: {
        type: String,
        maxlength: 15,
        unqiue: true,
      },
      youtube: {
        type: String,
        maxlength: 15,
      },
      twitter: {
        type: String,
        maxlength: 15,
      },
    },
    website: {
      type: String,
      maxlength: 25,
    },
  },
  birth: {
    type: String,
    maxlength: 25,
  },
  age: {
    type: String,
    maxlength: 2,
  },
  likes: {
    type: [String],
  },
  dislikes: {
    type: [String],
  },
  occupation: {
    type: String,
    maxlength: 50,
  },
  lastseen: {
    type: String,
    maxlength: 50,
  },
  nextcontact: {
    type: String,
    maxlength: 50,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  tags: {
    type: Array,

    validate: {
      validator: function (value) {
        return value.length <= 6;
      },
      message: "Max tag size is 6!",
    },
  },
  createdAt: {
    type: String,
    maxlength: 30,
  },
  editedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

function validatePerson(value) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    metAt: Joi.string().max(50).required(),
    place: Joi.string().allow("").max(50),
    contact: Joi.object({
      phone: Joi.string().allow("").max(20),
      email: Joi.string().allow("").email().max(255),
      socialmedia: Joi.object({
        instagram: Joi.string().allow("").max(15),
        youtube: Joi.string().allow("").max(15),
        twitter: Joi.string().allow("").max(15),
      }),
      website: Joi.string().allow("").max(25),
    }),
    birth: Joi.string().allow("").max(25),
    age: Joi.string().allow("").max(100),
    likes: Joi.array().allow(""),
    dislikes: Joi.array().allow(""),
    occupation: Joi.string().allow("").max(50),
    lastseen: Joi.string().allow("").max(50),
    nextcontact: Joi.string().allow("").max(50),
    notes: Joi.string().allow("").max(500),
    tags: Joi.array().allow("").max(6),
    createdAt: Joi.string().allow("").max(30),
  });
  return schema.validate(value, { allowUnknown: true });
}

exports.Person = Person;
exports.validate = validatePerson;
