const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  parent: { type: String, ref: "Article" },
  body: { type: String },
  users: { type: String, ref: "User" },
});

module.exports = mongoose.model("Comment", schema);
