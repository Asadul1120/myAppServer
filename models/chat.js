const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true }, // "user" or "admin"
    text: { type: String, required: true },
    userId: { type: String, required: true }, // to identify which user chat
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", messageSchema);
