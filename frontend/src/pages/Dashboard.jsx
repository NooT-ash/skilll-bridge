
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Brain,
  BriefcaseBusiness,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  GraduationCap
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { API_BASE_URL } from "../config/api.js";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student profile from MongoDB
  useEffect(() => {
    let isActive = true;

    async function fetchProfile() {
      const token = localStorage.getItem("skillbridgeToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const savedAssessment = JSON.parse(
          localStorage.getItem("skillbridgeAssessment") || "null"
        );

        if (isActive) {
          setAssessment(savedAssessment);
        }

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

        if (!response.ok) {
          localStorage.removeItem("skillbridgeToken");
          localStorage.removeItem("skillbridgeUser");
          navigate("/login", { replace: true });
          return;
        }

        if (isActive) {
          setUser(data.user);
          localStorage.setItem(
            "skillbridgeUser",
            JSON.stringify(data.user)
          );
        }
      } catch (error) {
        console.error("Profile fetching error:", error);

        // Use cached user details if the backend is temporarily unavailable
        const cachedUser = JSON.parse(
          localStorage.getItem("skillbridgeUser") || "null"
        );

        if (isActive && cachedUser) {
          setUser(cachedUser);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isActive = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading your SkillBridge dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-loading">
        Unable to load your profile. Please log in again.
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  const name = user.name || "Student";

  const features = [
    {
      title: "My Profile",
      description: "View your personal and academic information.",
      icon: <UserRound size={25} />,
      path: "/profile"
    },
    {
      title: "My Skills",
      description: "Add and manage your technical skills.",
      icon: <Brain size={25} />,
      path: "/skills"
    },
    {
      title: "Assessment Results",
      description: "Explore your skills and career recommendations.",
      icon: <ClipboardCheck size={25} />,
      path: "/assessment-results"
    },
    {
      title: "Career Opportunities",
      description: "Discover jobs that match your interests.",
      icon: <BriefcaseBusiness size={25} />,
      path: "/jobs"
    },
    {
      title: "Learning Resources",
      description: "Find resources to improve your skills.",
      icon: <BookOpen size={25} />,
      path: "/learning"
    }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-topbar">
          <div>
            <h2>Student Dashboard</h2>
            <p>Welcome to your SkillBridge student portal</p>
          </div>

          <div className="dashboard-user">
            <UserRound size={20} />
            <span>{name}</span>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="dashboard-hero">
          <div className="hero-content">
            <span className="hero-label">
              STUDENT DASHBOARD
            </span>

            <h1>Welcome back, {name}!</h1>

            <p>
              Build your skills, discover career opportunities
              and take the next step towards your future.
            </p>

            <button onClick={() => navigate("/skills")}>
              Explore My Skills
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-icon">
            <GraduationCap size={65} />
          </div>
        </section>

        {/* Profile Section */}
        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div className="heading-icon">
              <UserRound size={25} />
            </div>

            <div>
              <h2>My Profile</h2>
              <p>Your personal and academic information</p>
            </div>

            <button
              className="view-profile-button"
              onClick={() => navigate("/profile")}
            >
              View Profile <ArrowRight size={16} />
            </button>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <span>Name</span>
              <strong>{user.name || "Not added"}</strong>
            </div>

            <div className="profile-item">
              <span>Email Address</span>
              <strong>{user.email || "Not added"}</strong>
            </div>

            <div className="profile-item">
              <span>Phone Number</span>
              <strong>{user.phone || "Not added"}</strong>
            </div>

            <div className="profile-item">
              <span>College</span>
              <strong>{user.college || "Not added"}</strong>
            </div>

            <div className="profile-item">
              <span>Course</span>
              <strong>{user.course || "Not added"}</strong>
            </div>

            <div className="profile-item">
              <span>Current Year</span>
              <strong>{user.year || "Not added"}</strong>
            </div>
          </div>
        </section>

        {/* Assessment Section */}
        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div className="heading-icon">
              <ClipboardCheck size={25} />
            </div>

            <div>
              <h2>My Assessment Results</h2>
              <p>Your skills and career recommendations</p>
            </div>
          </div>

          {assessment ? (
            <div className="assessment-content">
              <h3>Your Selected Skills</h3>

              <div className="skill-tags">
                {(assessment.selectedSkills || []).map(
                  (skill, index) => (
                    <span className="skill-tag" key={index}>
                      {skill}
                    </span>
                  )
                )}
              </div>

              <h3>Your Career Interest</h3>
              <p>{assessment.interest || "Not specified"}</p>

              <h3>Recommended Careers</h3>

              <div className="career-tags">
                {(assessment.recommendations || []).map(
                  (career, index) => (
                    <span className="career-tag" key={index}>
                      ✨ {career}
                    </span>
                  )
                )}
              </div>

              <button
                className="dashboard-action-button"
                onClick={() => navigate("/assessment-results")}
              >
                View Full Results <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <div className="empty-assessment">
              <p>
                You have not completed your skills assessment yet.
              </p>

              <button
                className="dashboard-action-button"
                onClick={() => navigate("/skills")}
              >
                Start Skills Assessment
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>

        {/* Explore Section */}
        <section className="dashboard-section">
          <div className="section-heading">
            <h2>Explore Your Portal</h2>
            <p>Everything you need to grow your career</p>
          </div>

          <div className="dashboard-cards">
            {features.map((feature) => (
              <div className="dashboard-card" key={feature.title}>
                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <button
                  className="feature-button"
                  onClick={() => navigate(feature.path)}
                >
                  Explore <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="dashboard-about">
          <h2>About SkillBridge</h2>

          <p>
            SkillBridge is a student skill and job recommendation
            system. It helps students identify their strengths,
            explore career paths, discover opportunities and
            improve their skills through learning resources.
          </p>
        </section>

        <footer className="dashboard-footer">
          © 2026 SkillBridge | Student Skill & Job Recommendation System
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;
