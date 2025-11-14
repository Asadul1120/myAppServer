const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    message: [
      {
        type: String,
        required: [true, "Message is required"],
      },

    ],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "editor"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserMessage", UserSchema);
