/**
 * title: bujri-team.js
 * author: ngi bujri
 * date: may 12 2023
 * description: team schema
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// player schema
const playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number },
});

// team schema
const teamSchema = new Schema({
  name: { type: String, required: true },
  mascot: { type: String },
  players: [playerSchema],
});

module.exports = mongoose.model("Team", teamSchema);
