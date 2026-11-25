
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { API_BASE_URL } from "../config/api.js";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: password
          })
        }
      );

      const data = await response.json();

      // Check server response
      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      // Check token and user data
      if (!data.token || !data.user) {
        throw new Error("Login response is incomplete. Please try again.");
      }

      // Save login token
      localStorage.setItem(
        "skillbridgeToken",
        data.token
      );

      // Save student information
      localStorage.setItem(
        "skillbridgeUser",
        JSON.stringify(data.user)
      );

      // Navigate to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.message === "Failed to fetch") {
        setError(
          "Cannot connect to backend. Please start your server on port 5000."
        );
      } else {
        setError(err.message || "Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      {/* Left Branding Section */}
      <div className="auth-brand">

        <div className="brand-logo">S</div>

        <h2>SkillBridge</h2>

        <p>Connect Your Skills With Your Future</p>

        <div className="brand-content">

          <h1>Welcome Back!</h1>

          <p>
            Continue your learning journey, discover new
            opportunities and build your dream career.
          </p>

          <div className="brand-points">
            <p>✓ Discover your skills</p>
            <p>✓ Explore career opportunities</p>
            <p>✓ Achieve your career goals</p>
          </div>

        </div>

        <span className="brand-footer">
          Empowering Students. Connecting Careers.
        </span>

      </div>

      {/* Right Login Section */}
      <div className="auth-form-section">

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          <div className="form-heading">

            <span className="form-tag">
              STUDENT PORTAL
            </span>

            <h1>Login to Your Account</h1>

            <p>
              Enter your details to continue to SkillBridge.
            </p>

          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Email */}
          <label htmlFor="login-email">
            Email Address
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          {/* Password */}
          <label htmlFor="login-password">
            Password
          </label>

          <div className="password-field">

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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

          {/* Login Button */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login to SkillBridge →"}
          </button>

          {/* Register Link */}
          <p className="switch-auth">
            Don't have an account?
            <Link to="/register">
              {" "}Create Account
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
