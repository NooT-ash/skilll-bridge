
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Assessment = require("../models/Assessment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CHECK DATABASE
function showDatabaseInfo() {
  console.log("Authentication database:", User.db.name);
  console.log("Authentication collection:", User.collection.name);
}

// REGISTER STUDENT
router.post("/register", async (req, res) => {
  try {
    showDatabaseInfo();

    const {
      name,
      email,
      phone,
      college,
      course,
      year,
      password
    } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone || "",
      college: college || "",
      course: course || "",
      year: year || "",
      password: hashedPassword
    });

    console.log("New student registered:", newUser.email);

    return res.status(201).json({
      success: true,
      message: "Registration successful! Please login."
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email already exists in the database."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again."
    });
  }
});

// LOGIN STUDENT
router.post("/login", async (req, res) => {
  try {
    showDatabaseInfo();

    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account not found. Please register first."
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from .env");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful:", user.email);

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        course: user.course,
        year: user.year
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again."
    });
  }
});

// GET STUDENT PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found."
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch student profile."
    });
  }
});

// UPDATE STUDENT PROFILE
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      phone,
      college,
      course,
      year
    } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found."
      });
    }

    if (name !== undefined) user.name = name.trim();
    if (phone !== undefined) user.phone = phone;
    if (college !== undefined) user.college = college;
    if (course !== undefined) user.course = course;
    if (year !== undefined) user.year = year;

    await user.save();

    const updatedUser = await User.findById(req.userId)
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile."
    });
  }
});

// CHANGE STUDENT PASSWORD
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter your current and new password."
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least 6 characters."
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account not found."
      });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Your current password is incorrect."
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password."
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    console.log("Password changed successfully for:", user.email);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully!"
    });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password. Please try again."
    });
  }
});

// DELETE STUDENT ACCOUNT
router.delete("/delete-account", authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your current password."
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account not found."
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password."
      });
    }

    // Delete the student's assessment, if one exists.
    await Assessment.deleteMany({
      userId: user._id
    });

    // Delete the student account.
    await User.findByIdAndDelete(user._id);

    console.log("Student account deleted:", user.email);

    return res.status(200).json({
      success: true,
      message: "Your SkillBridge account has been deleted successfully."
    });

  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete account. Please try again."
    });
  }
});

module.exports = router;
