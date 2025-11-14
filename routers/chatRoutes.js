const express = require("express");
const router = express.Router();
const Message = require("../models/chat");

// Get all messages for a user
router.get("/:userId", async (req, res) => {
  const messages = await Message.find({ userId: req.params.userId });
  res.json(messages);
});

// Save a new message
router.post("/", async (req, res) => {
  const { sender, text, userId } = req.body;
  const message = await Message.create({ sender, text, userId });
  res.status(201).json(message);
});

module.exports = router;
