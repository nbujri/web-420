// title: bujri-composers.js
// author: Ngi Bujri
// date: april 9 2023
// description: Composers schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema
const composerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

module.exports = mongoose.model("Composer", composerSchema);
