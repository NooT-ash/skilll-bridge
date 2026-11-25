
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  GraduationCap,
  Building2,
  BookOpen,
  Brain,
  Pencil,
  ArrowLeft,
  RefreshCw,
  ShieldCheck
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../Profile.css";
import { API_BASE_URL } from "../config/api.js";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProfile() {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("skillbridgeToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/profile`,
        {
          method: "GET",
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
        throw new Error(
          data.message || "Unable to load profile."
        );
      }

      setUser(data.user || null);

    } catch (err) {
      console.error("Profile Error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to backend. Please check your server."
          : err.message
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  function formatDate(date) {
    if (!date) return "Not provided";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  const profileDetails = [
    {
      label: "Full Name",
      value: user?.name,
      icon: UserRound
    },
    {
      label: "Email Address",
      value: user?.email,
      icon: Mail
    },
    {
      label: "Phone Number",
      value: user?.phone,
      icon: Phone
    },
    {
      label: "Date of Birth",
      value: formatDate(user?.dob),
      icon: CalendarDays
    },
    {
      label: "Gender",
      value: user?.gender,
      icon: UserRound
    },
    {
      label: "College",
      value: user?.college,
      icon: Building2
    },
    {
      label: "Course",
      value: user?.course,
      icon: BookOpen
    },
    {
      label: "Current Year",
      value: user?.year,
      icon: GraduationCap
    }
  ];

  const userSkills = Array.isArray(user?.skills)
    ? user.skills
    : typeof user?.skills === "string"
      ? user.skills.split(",").map(skill => skill.trim()).filter(Boolean)
      : [];

  return (
    <div className="profile-layout">

      {/* Sidebar */}
      <Sidebar />

      <main className="profile-main">

        {/* Topbar */}
        <div className="profile-topbar">
          <div>
            <span className="profile-label">
              SKILLBRIDGE STUDENT PORTAL
            </span>

            <h2>My Profile</h2>

            <p>
              Manage and view your student information.
            </p>
          </div>

          <button
            className="profile-back-btn"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>

        {/* Welcome Section */}
        <section className="profile-welcome">
          <div>
            <h1>My Student Profile</h1>

            <p>
              Your personal details, academic information and
              registered skills in one place.
            </p>
          </div>

          <UserRound size={55} />
        </section>

        {/* Loading */}
        {loading && (
          <div className="profile-message">
            <RefreshCw
              className="profile-spinner"
              size={28}
            />

            <h3>Loading Your Profile...</h3>

            <p>
              Please wait while we retrieve your information.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="profile-error">
            <h3>Unable to Load Profile</h3>

            <p>{error}</p>

            <button onClick={fetchProfile}>
              Try Again
            </button>
          </div>
        )}

        {/* Profile Content */}
        {!loading && !error && user && (
          <>

            {/* Profile Header Card */}
            <section className="profile-card">

              <div className="profile-card-header">

                <div className="profile-avatar">
                  {user.name?.charAt(0).toUpperCase() || "S"}
                </div>

                <div className="profile-user-info">
                  <h2>{user.name || "Student"}</h2>

                  <p>
                    {user.email || "Email not available"}
                  </p>

                  <div className="profile-status">
                    <ShieldCheck size={15} />
                    Student Account
                  </div>
                </div>

                <button
                  className="profile-edit-btn"
                  onClick={() => navigate("/profile/edit")}
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>

              </div>

              <div className="profile-divider"></div>

              {/* Personal Information */}
              <div className="profile-section-heading">
                <UserRound size={21} />
                <h3>Personal & Academic Information</h3>
              </div>

              <div className="profile-details">

                {profileDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="detail-item"
                      key={item.label}
                    >
                      <div className="detail-icon">
                        <Icon size={19} />
                      </div>

                      <div>
                        <span>{item.label}</span>

                        <strong>
                          {item.value || "Not provided"}
                        </strong>
                      </div>
                    </div>
                  );
                })}

              </div>

              <div className="profile-divider"></div>

              {/* Registered Skills */}
              <div className="profile-section-heading">
                <Brain size={21} />
                <h3>My Registered Skills</h3>
              </div>

              <div className="profile-skills">

                {userSkills.length > 0 ? (
                  userSkills.map((skill, index) => (
                    <span key={`${skill}-${index}`}>
                      <Brain size={14} />
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No registered skills available.</p>
                )}

              </div>

            </section>

            {/* Footer */}
            <p className="profile-footer">
              <ShieldCheck size={15} />

              Your profile information is retrieved securely
              from SkillBridge.
            </p>

          </>
        )}

      </main>
    </div>
  );
}

export default Profile;
