
const express = require("express");
const router = express.Router();

const Assessment = require("../models/Assessment");
const authMiddleware = require("../middleware/authMiddleware");

// Save or update assessment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      selectedSkills,
      interest,
      recommendations
    } = req.body;

    if (
      !Array.isArray(selectedSkills) ||
      selectedSkills.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one skill."
      });
    }

    if (!interest || typeof interest !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please select your career interest."
      });
    }

    if (
      !Array.isArray(recommendations) ||
      recommendations.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Career recommendations are required."
      });
    }

    const assessment = await Assessment.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        selectedSkills,
        interest,
        recommendations,
        completedAt: new Date()
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Assessment saved successfully!",
      assessment
    });

  } catch (error) {
    console.error("Assessment Save Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to save assessment.",
      error: error.message
    });
  }
});

// Get logged-in student's assessment
router.get("/", authMiddleware, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      userId: req.userId
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "No assessment found. Please complete your assessment."
      });
    }

    res.status(200).json({
      success: true,
      assessment
    });

  } catch (error) {
    console.error("Assessment Fetch Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch assessment."
    });
  }
});

module.exports = router;
