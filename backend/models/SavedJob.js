
const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    // Student who saved the job
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Unique job identifier
    jobId: {
      type: String,
      required: true,
      trim: true
    },

    // Job information
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: ""
    },

    salary: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

// Prevent the same student from saving the same job twice
savedJobSchema.index(
  { userId: 1, jobId: 1 },
  { unique: true }
);

module.exports = mongoose.model("SavedJob", savedJobSchema);
