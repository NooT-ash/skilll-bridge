
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";

import Sidebar from "../components/Sidebar";
import "./SavedJobs.css";
import { API_BASE_URL } from "../config/api.js";

function SavedJobs() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("skillbridgeToken");

  // FETCH SAVED JOBS FROM MONGODB
  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/saved-jobs`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch saved jobs.");
        }

        setSavedJobs(data.savedJobs || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [token, navigate]);

  // REMOVE SAVED JOB FROM MONGODB
  const removeSavedJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this saved job?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/saved-jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to remove job.");
      }

      setSavedJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== id)
      );

    } catch (err) {
      alert(err.message);
    }
  };

  // OPEN JOB DETAILS
  const viewJobDetails = (job) => {
    const selectedJob = {
      id: job.jobId,
      jobId: job.jobId,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      link: job.link
    };

    sessionStorage.setItem(
      "selectedSkillBridgeJob",
      JSON.stringify(selectedJob)
    );

    navigate("/job-details", {
      state: { job: selectedJob }
    });
  };

  return (
    <>
      <Sidebar />

      <div className="saved-jobs-page">
        <div className="saved-jobs-container">

          <div className="saved-jobs-header">
            <div>
              <h1>My Saved Jobs</h1>
              <p>
                Keep track of job opportunities you are interested in.
              </p>
            </div>

            <div className="saved-jobs-count">
              <Bookmark size={20} />
              <span>{savedJobs.length} Saved Jobs</span>
            </div>
          </div>

          {loading && (
            <div className="saved-jobs-message">
              Loading your saved jobs...
            </div>
          )}

          {!loading && error && (
            <div className="saved-jobs-error">
              {error}
            </div>
          )}

          {!loading && !error && savedJobs.length === 0 && (
            <div className="saved-jobs-empty">
              <Bookmark size={55} />

              <h2>No Saved Jobs Yet</h2>

              <p>
                You haven't saved any jobs. Explore career opportunities
                and save jobs you like.
              </p>

              <button
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
              </button>
            </div>
          )}

          {!loading && !error && savedJobs.length > 0 && (
            <div className="saved-jobs-grid">

              {savedJobs.map((job) => (
                <div className="saved-job-card" key={job._id}>

                  <div className="saved-job-top">
                    <div className="saved-job-icon">
                      <Bookmark size={23} />
                    </div>

                    <button
                      className="remove-saved-job"
                      onClick={() => removeSavedJob(job._id)}
                      title="Remove saved job"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  <h2>{job.title}</h2>

                  <h3>{job.company}</h3>

                  <div className="saved-job-info">
                    {job.location && (
                      <span>📍 {job.location}</span>
                    )}

                    {job.type && (
                      <span>💼 {job.type}</span>
                    )}

                    {job.salary && (
                      <span>💰 {job.salary}</span>
                    )}
                  </div>

                  <p className="saved-job-description">
                    {job.description || "No job description available."}
                  </p>

                  <button
                    className="view-saved-job"
                    onClick={() => viewJobDetails(job)}
                  >
                    View Details
                    <ExternalLink size={16} />
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default SavedJobs;
