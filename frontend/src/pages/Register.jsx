
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    college: "",
    course: "",
    year: "",
    skills: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone,
            dob: formData.dob,
            gender: formData.gender,
            college: formData.college.trim(),
            course: formData.course,
            year: formData.year,
            skills: formData.skills,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      alert("Registration successful! Please login.");
      navigate("/login", { replace: true });

    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page register-page">

      <div className="auth-brand">
        <div className="brand-logo">S</div>
        <h2>SkillBridge</h2>
        <p>Connect Your Skills With Your Future</p>

        <div className="brand-content">
          <h1>Start Your Journey!</h1>
          <p>
            Build your student profile and discover
            career opportunities based on your skills.
          </p>

          <div className="brand-points">
            <p>✓ Create your student profile</p>
            <p>✓ Explore your technical skills</p>
            <p>✓ Discover your dream career</p>
          </div>
        </div>

        <span className="brand-footer">
          Your Career. Your Future. Your Success.
        </span>
      </div>

      <div className="auth-form-section register-section">
        <form
          className="auth-form register-form"
          onSubmit={handleRegister}
        >

          <div className="form-heading">
            <span className="form-tag">JOIN SKILLBRIDGE</span>
            <h1>Create Your Account</h1>
            <p>Enter your personal and academic information.</p>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10 digit phone number"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">
              Prefer not to say
            </option>
          </select>

          <label>College Name</label>
          <input
            type="text"
            name="college"
            placeholder="Enter your college name"
            value={formData.college}
            onChange={handleChange}
            required
          />

          <label>Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select your course</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Sc">B.Sc</option>
            <option value="MCA">MCA</option>
            <option value="Other">Other</option>
          </select>

          <label>Current Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <label>Your Skills</label>
          <textarea
            name="skills"
            placeholder="Example: HTML, CSS, Java, Python"
            value={formData.skills}
            onChange={handleChange}
            rows="3"
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />

            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create My Account →"}
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