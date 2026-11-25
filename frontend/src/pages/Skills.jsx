
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "./Skills.css";
import { API_BASE_URL } from "../config/api.js";

function Skills() {
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [interest, setInterest] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Technical skills
  const technicalSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Java",
    "Python",
    "C++",
    "SQL",
    "Excel",
    "Power BI"
  ];

  // Personal and professional skills
  const personalSkills = [
    "Communication",
    "Problem Solving",
    "Leadership",
    "Data Analysis",
    "Programming",
    "Creativity",
    "Project Management",
    "Marketing",
    "Design",
    "Critical Thinking",
    "Teamwork",
    "Adaptability"
  ];

  const interests = [
    "Web Development",
    "Data Analytics",
    "Cyber Security",
    "Artificial Intelligence",
    "Software Development"
  ];

  // Select or deselect a skill
  function handleSkillChange(skill) {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );

    setError("");
    setSuccess(false);
    setRecommendations([]);
  }

  // Generate career recommendations
  function generateRecommendations() {
    const careers = [];

    if (
      selectedSkills.some((skill) =>
        ["HTML", "CSS", "JavaScript", "React"].includes(skill)
      )
    ) {
      careers.push("Frontend Developer");
    }

    if (
      selectedSkills.some((skill) =>
        ["Python", "SQL", "Excel", "Power BI", "Data Analysis"].includes(skill)
      )
    ) {
      careers.push("Data Analyst");
    }

    if (
      selectedSkills.some((skill) =>
        ["Java", "C++", "Python", "Programming"].includes(skill)
      )
    ) {
      careers.push("Software Developer");
    }

    if (selectedSkills.includes("Design")) {
      careers.push("UI/UX Designer");
    }

    if (selectedSkills.includes("Marketing")) {
      careers.push("Digital Marketing Specialist");
    }

    if (selectedSkills.includes("Project Management")) {
      careers.push("Project Coordinator");
    }

    if (interest === "Cyber Security") {
      careers.push("Cyber Security Analyst");
    }

    if (interest === "Artificial Intelligence") {
      careers.push("AI / ML Engineer");
    }

    if (interest === "Data Analytics") {
      careers.push("Business Intelligence Analyst");
    }

    if (interest === "Web Development") {
      careers.push("Web Developer");
    }

    if (interest === "Software Development") {
      careers.push("Software Engineer");
    }

    if (careers.length === 0) {
      careers.push("Explore Beginner Programming Courses");
    }

    return [...new Set(careers)];
  }

  // Submit assessment and save to MongoDB
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (selectedSkills.length < 3) {
      setError("Please select at least 3 skills.");
      return;
    }

    if (!interest) {
      setError("Please select your career interest.");
      return;
    }

    const token = localStorage.getItem("skillbridgeToken");

    if (!token) {
      setError("Please login again to submit your assessment.");
      return;
    }

    const uniqueCareers = generateRecommendations();

    const assessmentData = {
      selectedSkills,
      interest,
      recommendations: uniqueCareers
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/assessment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(assessmentData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save assessment."
        );
      }

      const savedAssessment = data.assessment || {
        ...assessmentData,
        completedAt: new Date().toISOString()
      };

      localStorage.setItem(
        "skillbridgeAssessment",
        JSON.stringify(savedAssessment)
      );

      setRecommendations(uniqueCareers);
      setSuccess(true);

    } catch (err) {
      console.error("Assessment Error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to backend. Please check your server."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  // Reusable skill selection section
  function renderSkillGrid(skillList) {
    return (
      <div className="skills-grid">
        {skillList.map((skill) => (
          <label
            key={skill}
            className={
              selectedSkills.includes(skill)
                ? "skill-chip selected"
                : "skill-chip"
            }
          >
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => handleSkillChange(skill)}
            />

            <span>{skill}</span>

            {selectedSkills.includes(skill) && (
              <CheckCircle size={16} />
            )}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="skills-layout">

      {/* Slide-in Sidebar */}
      <Sidebar />

      <main className="skills-main">

        {/* Topbar */}
        <div className="skills-topbar">
          <div>
            <h2>Skills Assessment</h2>
            <p>Discover your strengths and career opportunities</p>
          </div>

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>

        {/* Page Heading */}
        <section className="skills-heading">
          <span className="skills-tag">
            STUDENT CAREER PORTAL
          </span>

          <h1>Discover Your Career Path</h1>

          <p>
            Select your technical skills, personal skills and career
            interests. SkillBridge will suggest suitable career options.
          </p>
        </section>

        {/* Selected Skills Summary */}
        <div className="skills-summary">
          <div>
            <span className="summary-number">
              {selectedSkills.length}
            </span>
            <div>
              <h3>Your Selected Skills</h3>
              <p>Select at least 3 skills to continue.</p>
            </div>
          </div>
          <Sparkles size={28} />
        </div>

        {/* Assessment Form */}
        <section className="skills-card">
          <form onSubmit={handleSubmit}>

            {/* Technical Skills */}
            <div className="skills-section-heading">
              <h2>1. Technical Skills</h2>
              <p>
                Select the technical skills you have learned.
              </p>
            </div>

            <div className="skills-count">
              {selectedSkills.filter((skill) =>
                technicalSkills.includes(skill)
              ).length} technical skills selected
            </div>

            {renderSkillGrid(technicalSkills)}

            {/* Your Skills */}
            <div className="skills-section-heading interest-heading">
              <h2>2. Your Skills</h2>
              <p>
                Choose the personal and professional skills you're interested in.
              </p>
            </div>

            <div className="skills-count">
              {selectedSkills.filter((skill) =>
                personalSkills.includes(skill)
              ).length} personal and professional skills selected
            </div>

            {renderSkillGrid(personalSkills)}

            {/* Career Interest */}
            <div className="skills-section-heading interest-heading">
              <h2>3. Choose Your Career Interest</h2>
              <p>
                Select the field you want to explore.
              </p>
            </div>

            <select
              className="career-select"
              value={interest}
              onChange={(e) => {
                setInterest(e.target.value);
                setSuccess(false);
                setError("");
                setRecommendations([]);
              }}
              required
            >
              <option value="">
                Select your career interest
              </option>

              {interests.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Error */}
            {error && (
              <div className="skills-error">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              className="recommend-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving Assessment..."
                : "Get Career Recommendations"}
            </button>

          </form>
        </section>

        {/* Recommendation Results */}
        {recommendations.length > 0 && (
          <section className="recommendation-card">

            <div className="recommendation-heading">
              <span>YOUR ASSESSMENT RESULTS</span>

              <h2>Your Recommended Careers</h2>

              <p>
                These career options are based on your selected
                skills and interests.
              </p>
            </div>

            <div className="recommendation-grid">
              {recommendations.map((career, index) => (
                <div className="career-result" key={career}>
                  <div className="career-number">
                    {index + 1}
                  </div>

                  <span>Career Option {index + 1}</span>

                  <h3>{career}</h3>
                </div>
              ))}
            </div>

            {success && (
              <p className="assessment-success">
                Assessment saved successfully in MongoDB!
              </p>
            )}

            <button
              className="view-results-btn"
              onClick={() => navigate("/assessment-results")}
            >
              View Assessment Results
            </button>

          </section>
        )}

      </main>
    </div>
  );
}

export default Skills;
