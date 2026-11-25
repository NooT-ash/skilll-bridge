
const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    selectedSkills: {
      type: [String],
      required: true
    },

    interest: {
      type: String,
      required: true
    },

    recommendations: {
      type: [String],
      required: true
    },

    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
