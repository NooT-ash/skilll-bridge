
const express = require("express");
const SavedJob = require("../models/SavedJob");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// SAVE A JOB
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      jobId,
      title,
      company,
      location,
      type,
      salary,
      description,
      link
    } = req.body;

    if (!jobId || !title || !company) {
      return res.status(400).json({
        success: false,
        message: "Job ID, title and company are required."
      });
    }

    // Check whether this student has already saved this job
    const existingJob = await SavedJob.findOne({
      userId: req.userId,
      jobId: String(jobId)
    });

    if (existingJob) {
      return res.status(409).json({
        success: false,
        message: "You have already saved this job."
      });
    }

    const savedJob = await SavedJob.create({
      userId: req.userId,
      jobId: String(jobId),
      title,
      company,
      location: location || "",
      type: type || "",
      salary: salary || "",
      description: description || "",
      link: link || ""
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully!",
      savedJob
    });

  } catch (error) {
    console.error("SAVE JOB ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This job is already saved."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to save job."
    });
  }
});

// GET ALL SAVED JOBS FOR LOGGED-IN STUDENT
router.get("/", authMiddleware, async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: savedJobs.length,
      savedJobs
    });

  } catch (error) {
    console.error("GET SAVED JOBS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch saved jobs."
    });
  }
});

// DELETE A SAVED JOB
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedJob = await SavedJob.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Saved job removed successfully."
    });

  } catch (error) {
    console.error("DELETE SAVED JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove saved job."
    });
  }
});

module.exports = router;
