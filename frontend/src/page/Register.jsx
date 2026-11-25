
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { API_BASE_URL } from "../config/api.js";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    year: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            course: formData.course,
            year: formData.year,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (err) {
      setError(err.message || "Unable to register.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-brand">
        <div className="brand-logo">S</div>
        <h2>SkillBridge</h2>
        <p>Connect Your Skills With Your Future</p>

        <div className="brand-content">
          <h1>Join SkillBridge!</h1>
          <p>
            Create your student account and discover
            opportunities for your future career.
          </p>
        </div>

        <span className="brand-footer">
          Empowering Students. Connecting Careers.
        </span>
      </div>

      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleRegister}>

          <div className="form-heading">
            <span className="form-tag">STUDENT PORTAL</span>
            <h1>Create Account</h1>
            <p>Enter your details to join SkillBridge.</p>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <label>Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>College</label>
          <input
            name="college"
            type="text"
            placeholder="Enter your college"
            value={formData.college}
            onChange={handleChange}
          />

          <label>Course</label>
          <input
            name="course"
            type="text"
            placeholder="Enter your course"
            value={formData.course}
            onChange={handleChange}
          />

          <label>Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Final Year">Final Year</option>
          </select>

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          <p className="switch-auth">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;