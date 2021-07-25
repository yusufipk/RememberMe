const mongoose = require("mongoose");
const Joi = require("joi");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: true,
  },
  place: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  contact: {
    type: new mongoose.Schema({
      phone: {
        type: String,
        minlength: 5,
        maxlength: 20,
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 255,
      },
      socialmedia: {
        type: new mongoose.Schema({
          instagram: {
            type: String,
            minlength: 3,
            maxlength: 15,
            unqiue: true,
          },
          youtube: {
            type: String,
            minlength: 3,
            maxlength: 15,
          },
          twitter: {
            type: String,
            minlength: 3,
            maxlength: 15,
          },
        }),
      },
      website: {
        type: String,
        minlength: 5,
        maxlength: 25,
      },
    }),
  },
  birth: {
    type: String,
    maxlength: 25,
  },
  age: {
    type: Number,
    maxlength: 100,
  },
  likes: {
    type: [String],
  },
  dislikes: {
    type: [String],
  },
  occupation: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  lastseen: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  nextcontact: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  notes: {
    type: String,
    minlength: 3,
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
    maxlength: 25,
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
    name: Joi.string().min(3).max(50).required(),
    place: Joi.string().min(3).max(50).required(),
    contact: Joi.object({
      phone: Joi.string().min(5).max(20),
      email: Joi.string().email().min(5).max(255),
      socialmedia: Joi.object({
        instagram: Joi.string().min(3).max(15),
        youtube: Joi.string().min(3).max(15),
        twitter: Joi.string().min(3).max(15),
      }),
      website: Joi.string().min(5).max(25),
    }),
    birth: Joi.string().max(25),
    age: Joi.number().max(100),
    likes: Joi.array(),
    dislikes: Joi.array(),
    occupation: Joi.string().min(3).max(50),
    lastseen: Joi.string().min(3).max(50),
    nextcontact: Joi.string().min(3).max(50),
    notes: Joi.string().min(3).max(500),
    tags: Joi.array().max(6),
    createdAt: Joi.string().max(25),
  });
  return schema.validate(value, { allowUnknown: true });
}

exports.Person = Person;
exports.validate = validatePerson;
