const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  //上级分类关联 指定mongoose.SchemaTypes.ObjectId 和ref指定模型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});

schema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Category",
});

module.exports = mongoose.model("Category", schema);
