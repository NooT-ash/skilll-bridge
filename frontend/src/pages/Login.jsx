
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

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
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password
          })
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.token || !data.user) {
        throw new Error("Token or user details are missing.");
      }

      localStorage.setItem("skillbridgeToken", data.token);
      localStorage.setItem(
        "skillbridgeUser",
        JSON.stringify(data.user)
      );

      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Unable to login.");

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

      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleLogin}>

          <div className="form-heading">
            <span className="form-tag">STUDENT PORTAL</span>
            <h1>Login to Your Account</h1>
            <p>Enter your details to continue to SkillBridge.</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login to SkillBridge →"}
          </button>

          <p className="switch-auth">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
          </p>

        </form>
      </div>

    </div>
  );
}

export default Login;
