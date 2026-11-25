
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: ""
    },
    college: {
      type: String,
      default: ""
    },
    course: {
      type: String,
      default: ""
    },
    year: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
