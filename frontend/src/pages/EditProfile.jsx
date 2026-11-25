
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Phone,
  Building2,
  BookOpen,
  GraduationCap,
  Save,
  ArrowLeft,
  RefreshCw
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    course: "",
    year: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("skillbridgeToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("skillbridgeToken");
          localStorage.removeItem("skillbridgeUser");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile.");
        }

        setFormData({
          name: data.user?.name || "",
          phone: data.user?.phone || "",
          college: data.user?.college || "",
          course: data.user?.course || "",
          year: data.user?.year || ""
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const token = localStorage.getItem("skillbridgeToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            college: formData.college.trim(),
            course: formData.course.trim(),
            year: formData.year.trim()
          })
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("skillbridgeToken");
        localStorage.removeItem("skillbridgeUser");
        navigate("/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed.");
      }

      setSuccess("Your profile has been updated successfully!");

      if (data.user) {
        setFormData({
          name: data.user.name || "",
          phone: data.user.phone || "",
          college: data.user.college || "",
          course: data.user.course || "",
          year: data.user.year || ""
        });
      }

      setTimeout(() => {
        navigate("/profile");
      }, 1200);

    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to backend. Please check your server."
          : err.message
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="edit-profile-loading">
        <RefreshCw className="edit-spinner" size={28} />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="edit-profile-layout">
      <Sidebar />

      <main className="edit-profile-main">

        <div className="edit-profile-topbar">
          <div>
            <span>SKILLBRIDGE STUDENT PORTAL</span>
            <h2>Edit Profile</h2>
            <p>Update your personal and academic information.</p>
          </div>

          <button
            className="edit-back-btn"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft size={17} />
            Back to Profile
          </button>
        </div>

        <section className="edit-profile-banner">
          <UserRound size={48} />

          <div>
            <h1>Update Your Profile</h1>
            <p>
              Keep your student information accurate and up to date.
            </p>
          </div>
        </section>

        <section className="edit-profile-card">

          <div className="edit-card-heading">
            <h2>Personal & Academic Details</h2>
            <p>Change the information below and save your updates.</p>
          </div>

          {error && (
            <div className="edit-error">
              {error}
            </div>
          )}

          {success && (
            <div className="edit-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="edit-form-grid">

              <div className="edit-form-group">
                <label>Full Name</label>
                <div className="edit-input-wrapper">
                  <UserRound size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="edit-form-group">
                <label>Phone Number</label>
                <div className="edit-input-wrapper">
                  <Phone size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="edit-form-group">
                <label>College Name</label>
                <div className="edit-input-wrapper">
                  <Building2 size={18} />
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter college name"
                  />
                </div>
              </div>

              <div className="edit-form-group">
                <label>Course</label>
                <div className="edit-input-wrapper">
                  <BookOpen size={18} />
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="Enter your course"
                  />
                </div>
              </div>

              <div className="edit-form-group">
                <label>Current Year</label>
                <div className="edit-input-wrapper">
                  <GraduationCap size={18} />
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
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="edit-form-actions">

              <button
                type="button"
                className="edit-cancel-btn"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-save-btn"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="edit-spinner" size={17} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </form>
        </section>

      </main>
    </div>
  );
}

export default EditProfile;
