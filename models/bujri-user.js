/**
 * title: bujri-user.js
 * author: ngi bujri
 * date: april 23 2023
 * description: user schema
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  emailAddress: { type: String },
});

module.exports = mongoose.model("User", userSchema);
