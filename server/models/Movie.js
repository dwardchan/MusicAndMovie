const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  img: { type: String },
  actor: { type: String },
  scores: {
    doubanRating: { type: Number },
    imdbRating: { type: Number },
  },
  // comments: [{ type: String }],
  description: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Movie", schema);
