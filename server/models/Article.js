const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Article", schema);
