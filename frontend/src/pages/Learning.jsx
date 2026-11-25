
import { useNavigate } from "react-router-dom";
import "../Auth.css";
import "./Skills.css";

function Learning() {
  const navigate = useNavigate();

  const resources = [
    {
      title: "HTML & CSS",
      description: "Learn website structure and styling.",
      level: "Beginner",
      link: "https://www.freecodecamp.org/learn/"
    },
    {
      title: "JavaScript",
      description: "Learn programming and interactive websites.",
      level: "Beginner",
      link: "https://javascript.info/"
    },
    {
      title: "React JS",
      description: "Learn how to build modern React applications.",
      level: "Intermediate",
      link: "https://react.dev/learn"
    },
    {
      title: "Python Programming",
      description: "Learn Python programming from the basics.",
      level: "Beginner",
      link: "https://www.learnpython.org/"
    },
    {
      title: "SQL",
      description: "Learn database queries and data management.",
      level: "Beginner",
      link: "https://www.w3schools.com/sql/"
    },
    {
      title: "Cyber Security",
      description: "Explore cybersecurity concepts and skills.",
      level: "Beginner",
      link: "https://www.cybrary.it/"
    }
  ];

  return (
    <div className="skills-page">
      <nav className="skills-navbar">
        <h2>SkillBridge</h2>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </nav>

      <div className="skills-container">
        <div className="skills-heading">
          <span className="skills-tag">LEARNING CENTER</span>
          <h1>Learning Resources</h1>
          <p>
            Improve your skills with free learning resources and tutorials.
          </p>
        </div>

        <div className="recommendation-grid">
          {resources.map((resource, index) => (
            <div className="career-result" key={index}>
              <span>{resource.level}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Learning →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learning;
