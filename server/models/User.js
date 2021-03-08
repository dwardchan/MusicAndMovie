const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    },
  },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

schema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "User",
});

module.exports = mongoose.model("User", schema);
