
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "./ChangePassword.css";
import { API_BASE_URL } from "../config/api.js";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function togglePassword(field) {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must contain at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("skillbridgeToken");

      const response = await fetch(
        `${API_BASE_URL}/api/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to change password.");
      }

      setSuccess(data.message || "Password changed successfully!");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="change-password-page">
      <Sidebar />

      <main className="change-password-content">
        <button
          className="password-back-button"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft size={18} /> Back to Profile
        </button>

        <div className="password-card">
          <div className="password-icon">
            <LockKeyhole size={30} />
          </div>

          <h1>Change Password</h1>
          <p className="password-subtitle">
            Keep your SkillBridge account secure.
          </p>

          {error && <div className="password-error">{error}</div>}
          {success && <div className="password-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <label>Current Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => togglePassword("current")}
              >
                {showPassword.current ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => togglePassword("new")}
              >
                {showPassword.new ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <label>Confirm New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => togglePassword("confirm")}
              >
                {showPassword.confirm ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              className="password-submit-button"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChangePassword;
