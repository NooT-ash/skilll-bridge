
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  BriefcaseBusiness,
  Brain,
  CalendarDays,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  GraduationCap
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "./AssessmentResults.css";

function AssessmentResults() {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAssessment() {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("skillbridgeToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/assessment",
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
          data.message || "Unable to load assessment results."
        );
      }

      setAssessment(data.assessment || null);

    } catch (err) {
      console.error("Assessment Results Error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Please check whether your backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssessment();
  }, []);

  const completedDate = assessment?.completedAt
    ? new Date(assessment.completedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    : "Date not available";

  return (
    <div className="assessment-layout">
      <Sidebar />

      <main className="assessment-main">

        {/* Top Navbar */}
        <div className="assessment-topbar">
          <div>
            <span className="assessment-label">
              SKILLBRIDGE STUDENT PORTAL
            </span>
            <h2>Assessment Results</h2>
            <p>Track your skills and explore your career opportunities.</p>
          </div>

          <button
            className="assessment-back-btn"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>

        {/* Welcome Section */}
        <section className="assessment-welcome">
          <div>
            <span>YOUR CAREER JOURNEY</span>
            <h1>Your Assessment Results</h1>
            <p>
              Discover your strengths and explore career paths
              based on your skills and interests.
            </p>
          </div>

          <div className="assessment-welcome-icon">
            <GraduationCap size={65} />
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="assessment-message">
            <RefreshCw
              className="assessment-spinner"
              size={30}
            />
            <h3>Loading Your Results</h3>
            <p>Please wait while we retrieve your saved assessment.</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="assessment-error">
            <h3>Unable to Load Results</h3>
            <p>{error}</p>

            <button onClick={fetchAssessment}>
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {/* No Assessment */}
        {!loading && !error && !assessment && (
          <div className="assessment-empty">
            <div className="assessment-empty-icon">
              <Brain size={45} />
            </div>

            <h2>No Assessment Found</h2>

            <p>
              You have not completed your skills assessment yet.
              Start your assessment to receive personalized career
              recommendations.
            </p>

            <button onClick={() => navigate("/skills")}>
              Start Assessment
            </button>
          </div>
        )}

        {/* Assessment Results */}
        {!loading && !error && assessment && (
          <>

            {/* Success Message */}
            <div className="assessment-success">
              <CheckCircle size={21} />
              <div>
                <h3>Assessment Loaded Successfully!</h3>
                <p>Your saved assessment was retrieved from MongoDB.</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="assessment-info-grid">

              <div className="assessment-info-card">
                <div className="assessment-icon">
                  <Brain size={25} />
                </div>

                <h3>
                  {assessment.selectedSkills?.length || 0}
                </h3>

                <p>Skills Selected</p>
              </div>

              <div className="assessment-info-card">
                <div className="assessment-icon">
                  <Target size={25} />
                </div>

                <h3>
                  {assessment.recommendations?.length || 0}
                </h3>

                <p>Career Recommendations</p>
              </div>

              <div className="assessment-info-card">
                <div className="assessment-icon">
                  <BriefcaseBusiness size={25} />
                </div>

                <h3 className="interest-value">
                  {assessment.interest || "Not specified"}
                </h3>

                <p>Career Interest</p>
              </div>

            </div>

            {/* Selected Skills */}
            <section className="assessment-result-card">
              <div className="assessment-section-heading">
                <div className="assessment-section-icon">
                  <Brain size={23} />
                </div>

                <div>
                  <h2>Your Selected Skills</h2>
                  <p>Skills you selected during your assessment.</p>
                </div>
              </div>

              <div className="assessment-skills">
                {assessment.selectedSkills?.length > 0 ? (
                  assessment.selectedSkills.map((skill, index) => (
                    <span key={`${skill}-${index}`}>
                      <CheckCircle size={15} />
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No skills found.</p>
                )}
              </div>
            </section>

            {/* Recommended Careers */}
            <section className="assessment-result-card">
              <div className="assessment-section-heading">
                <div className="assessment-section-icon">
                  <BriefcaseBusiness size={23} />
                </div>

                <div>
                  <h2>Recommended Careers</h2>
                  <p>Career paths based on your selected skills.</p>
                </div>
              </div>

              <div className="assessment-careers">
                {assessment.recommendations?.length > 0 ? (
                  assessment.recommendations.map((career, index) => (
                    <div
                      className="assessment-career-item"
                      key={`${career}-${index}`}
                    >
                      <div className="assessment-career-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="assessment-career-details">
                        <span>CAREER OPTION {index + 1}</span>
                        <h3>{career}</h3>
                      </div>

                      <CheckCircle
                        className="assessment-career-check"
                        size={22}
                      />
                    </div>
                  ))
                ) : (
                  <p>No career recommendations found.</p>
                )}
              </div>
            </section>

            {/* Completion Date */}
            <div className="assessment-date">
              <CalendarDays size={20} />

              <div>
                <span>Assessment Completed</span>
                <h3>{completedDate}</h3>
              </div>
            </div>

            {/* Retake Button */}
            <div className="assessment-actions">
              <button
                className="assessment-retake-btn"
                onClick={() => navigate("/skills")}
              >
                <RefreshCw size={18} />
                Retake Assessment
              </button>
            </div>

          </>
        )}

      </main>
    </div>
  );
}

export default AssessmentResults;
