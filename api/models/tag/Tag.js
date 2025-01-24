// Model: Tag
const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tag_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
