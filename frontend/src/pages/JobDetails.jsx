
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Skills.css";

function JobDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob =
      location.state?.job ||
      JSON.parse(sessionStorage.getItem("selectedSkillBridgeJob") || "null");

    if (selectedJob) {
      setJob(selectedJob);
    }
  }, [location.state]);

  function handleApply() {
    if (job?.link) {
      window.open(job.link, "_blank", "noopener,noreferrer");
    }
  }

  if (!job) {
    return (
      <div className="skills-page">
        <nav className="skills-navbar">
          <h2>SkillBridge</h2>
          <button onClick={() => navigate("/jobs")}>Back to Jobs</button>
        </nav>

        <div className="job-details-container">
          <div className="no-jobs">
            <h2>Job Details Not Found</h2>
            <p>Please select a job from the Job Opportunities page.</p>
            <button
              className="recommend-btn"
              onClick={() => navigate("/jobs")}
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      <nav className="skills-navbar">
        <h2>SkillBridge</h2>
        <button onClick={() => navigate("/jobs")}>
          Back to Jobs
        </button>
      </nav>

      <div className="job-details-container">
        <button
          className="back-link"
          onClick={() => navigate("/jobs")}
        >
          ← Back to Job Opportunities
        </button>

        <section className="job-details-card">
          <div className="job-details-top">
            <div className="job-details-icon">💼</div>
            <span className="job-type">{job.type}</span>
          </div>

          <h1>{job.title}</h1>
          <h3 className="job-details-company">{job.company}</h3>

          <div className="job-details-info">
            <div>
              <span>📍 Location</span>
              <strong>{job.location}</strong>
            </div>
            <div>
              <span>🎓 Experience Level</span>
              <strong>{job.level}</strong>
            </div>
            <div>
              <span>💼 Job Type</span>
              <strong>{job.type}</strong>
            </div>
            <div>
              <span>📂 Category</span>
              <strong>{job.category}</strong>
            </div>
          </div>

          <div className="job-details-section">
            <h2>About This Opportunity</h2>
            <p>{job.description}</p>
          </div>

          <div className="job-details-section">
            <h2>Required Skills</h2>
            <div className="job-skills">
              {job.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="job-details-note">
            <strong>Note:</strong>
            <p>
              This is a sample job listing created for the SkillBridge
              project. Please check the external job website for actual
              vacancies and application requirements.
            </p>
          </div>

          <button className="details-apply-button" onClick={handleApply}>
            Apply Now →
          </button>
        </section>
      </div>
    </div>
  );
}

export default JobDetails;
