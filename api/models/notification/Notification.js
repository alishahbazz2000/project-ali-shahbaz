// Model: Event
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event_type: {
    type: String,
    required: true,
    enum: [
      "POST_CREATED",
      "POST_LIKED",
      "POST_UNLIKE",
      "COMMENT_ADDED",
      "POST_UPDATED",
      "USER_REGISTERED",
    ],
  },
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "source_model",
  },
  source_model: {
    type: String,
    required: true,
    enum: ["Post", "Comment", "User"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
