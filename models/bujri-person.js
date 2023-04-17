/**
 * title: bujri-person.js
 * author: ngi bujri
 * date: april 16 2023
 * description: person model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// role schema
const roleSchema = new Schema({
  text: { type: String },
});

// dependent schema
const dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// person schema
const personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

module.exports = mongoose.model("Person", personSchema);
