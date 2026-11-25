
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";

const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Pune",
    type: "Full Time",
    career: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    salary: "3-5 LPA",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "DataTech",
    location: "Pune",
    type: "Full Time",
    career: "Data Analytics",
    skills: ["Excel", "SQL", "Python", "Power BI"],
    salary: "4-6 LPA",
  },
  {
    id: 3,
    title: "Java Developer",
    company: "CodeWorks",
    location: "Mumbai",
    type: "Full Time",
    career: "Software Development",
    skills: ["Java", "OOP", "SQL"],
    salary: "3-5 LPA",
  },
  {
    id: 4,
    title: "Cyber Security Intern",
    company: "SecureNet",
    location: "Pune",
    type: "Internship",
    career: "Cyber Security",
    skills: ["Networking", "Linux", "Security"],
    salary: "15-20K/month",
  },
  {
    id: 5,
    title: "Python Developer",
    company: "Innovate Labs",
    location: "Remote",
    type: "Internship",
    career: "AI & Machine Learning",
    skills: ["Python", "Machine Learning", "SQL"],
    salary: "20-25K/month",
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Pune",
    type: "Full Time",
    career: "UI/UX Design",
    skills: ["Figma", "UI Design", "Prototyping"],
    salary: "3-4 LPA",
  },
];

function Jobs() {
  const [assessment, setAssessment] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("skillbridgeSavedJobs") || "[]")
  );

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("skillbridgeAssessment") || "null"
    );
    setAssessment(data);
  }, []);

  const careers = assessment?.recommendations || [];
  const selectedSkills = assessment?.selectedSkills || [];

  const recommendedJobs = jobData.filter((job) => {
    const careerMatch = careers.some(
      (career) =>
        career.toLowerCase() === job.career.toLowerCase()
    );

    const skillMatch = job.skills.some((skill) =>
      selectedSkills.some(
        (selected) =>
          selected.toLowerCase() === skill.toLowerCase()
      )
    );

    return careerMatch || skillMatch;
  });

  const displayedJobs = jobData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesFilter =
      filter === "All" ||
      (filter === "Recommended" && recommendedJobs.includes(job)) ||
      job.type === filter;

    return matchesSearch && matchesFilter;
  });

  function saveJob(job) {
    const updatedJobs = savedJobs.some((item) => item.id === job.id)
      ? savedJobs.filter((item) => item.id !== job.id)
      : [...savedJobs, job];

    setSavedJobs(updatedJobs);
    localStorage.setItem(
      "skillbridgeSavedJobs",
      JSON.stringify(updatedJobs)
    );
  }

  return (
    <div className="jobs-page">
      <nav className="jobs-navbar">
        <Link to="/dashboard" className="jobs-logo">
          SkillBridge
        </Link>

        <div className="jobs-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/saved-jobs">Saved Jobs</Link>
        </div>
      </nav>

      <section className="jobs-header">
        <h1>Explore Job Opportunities</h1>
        <p>Find opportunities that match your skills and career goals.</p>
      </section>

      <section className="jobs-content">
        {assessment ? (
          <div className="match-box">
            <h3>Your Career Matches</h3>
            <p>
              Based on your skills assessment, we found{" "}
              <strong>{recommendedJobs.length}</strong> matching jobs.
            </p>
            <div className="career-tags">
              {careers.map((career, index) => (
                <span key={index}>{career}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="match-box">
            <h3>Get Personalized Job Recommendations</h3>
            <p>Complete your skills assessment to find matching jobs.</p>
            <Link to="/assessment" className="assessment-link">
              Take Assessment
            </Link>
          </div>
        )}

        <div className="jobs-controls">
          <input
            type="text"
            placeholder="Search jobs, companies or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Jobs</option>
            <option value="Recommended">Recommended Jobs</option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internships</option>
          </select>
        </div>

        <h2>Available Jobs ({displayedJobs.length})</h2>

        <div className="jobs-grid">
          {displayedJobs.map((job) => {
            const isRecommended = recommendedJobs.some(
              (item) => item.id === job.id
            );

            const isSaved = savedJobs.some(
              (item) => item.id === job.id
            );

            return (
              <div className="job-card" key={job.id}>
                {isRecommended && (
                  <span className="recommended-label">
                    Recommended for you
                  </span>
                )}

                <h3>{job.title}</h3>
                <p className="job-company">{job.company}</p>

                <p>📍 {job.location}</p>
                <p>💼 {job.type}</p>
                <p>💰 {job.salary}</p>

                <div className="job-skills">
                  {job.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="job-actions">
                  <Link
                    to={`/job-details?id=${job.id}`}
                    className="view-job"
                  >
                    View Details
                  </Link>

                  <button onClick={() => saveJob(job)}>
                    {isSaved ? "Saved ✓" : "Save Job"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {displayedJobs.length === 0 && (
          <p className="no-jobs">No jobs found. Try another search.</p>
        )}
      </section>
    </div>
  );
}

export default Jobs;