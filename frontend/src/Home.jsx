
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="website">

      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">S</span>
          SkillBridge
        </Link>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how">How It Works</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">

          <div className="hero-tag">
            ✨ YOUR CAREER JOURNEY STARTS HERE
          </div>

          <h1>
            Build Your Skills.<br />
            <span>Discover Your Future.</span>
          </h1>

          <p>
            Welcome to SkillBridge – your smart career companion.
            Discover your strengths, improve your skills and find
            job opportunities that match your interests.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Get Started Free →
            </Link>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>

          <div className="hero-trust">
            <span>✓ Easy to use</span>
            <span>✓ Student friendly</span>
            <span>✓ Career focused</span>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="hero-visual">
          <div className="main-card">
            <div className="card-top">
              <div>
                <span className="small-text">YOUR CAREER DASHBOARD</span>
                <h3>Welcome, Student! 👋</h3>
              </div>
              <span className="profile-icon">🎓</span>
            </div>

            <div className="progress-box">
              <p>Your Skill Development</p>
              <div className="progress-number">75%</div>
              <div className="progress-bar">
                <div></div>
              </div>
              <span>Keep learning and growing!</span>
            </div>

            <div className="career-options">
              <h4>Recommended Career Paths</h4>
              <div className="career-item">
                <span className="career-icon">💻</span>
                <div>
                  <strong>Web Developer</strong>
                  <small>Frontend & Backend</small>
                </div>
                <span>→</span>
              </div>

              <div className="career-item">
                <span className="career-icon">🤖</span>
                <div>
                  <strong>AI & ML Engineer</strong>
                  <small>Artificial Intelligence</small>
                </div>
                <span>→</span>
              </div>

              <div className="career-item">
                <span className="career-icon">🔐</span>
                <div>
                  <strong>Cyber Security</strong>
                  <small>Security & Protection</small>
                </div>
                <span>→</span>
              </div>
            </div>
          </div>

          <div className="floating-card">
            ⭐ Learn. Grow. Succeed.
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Everything You Need to Grow</h2>
          <p>Build the right skills and move closer to your dream career.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon purple">🎯</div>
            <h3>Skill Assessment</h3>
            <p>Understand your skills and identify areas where you can improve.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue">💡</div>
            <h3>Skill Recommendations</h3>
            <p>Discover useful skills according to your interests and career goals.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange">💼</div>
            <h3>Job Recommendations</h3>
            <p>Explore job opportunities that match your skills and qualifications.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">📈</div>
            <h3>Career Growth</h3>
            <p>Track your learning progress and prepare for your future career.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="about-content">
          <span>ABOUT SKILLBRIDGE</span>
          <h2>Connecting Student Skills With Career Opportunities</h2>
          <p>
            SkillBridge is a student-focused platform designed to
            connect education, skills and employment. It helps students
            understand what to learn and explore career opportunities
            based on their abilities and interests.
          </p>
          <Link to="/register" className="primary-btn">
            Start Your Journey →
          </Link>
        </div>

        <div className="about-box">
          <div className="about-symbol">🚀</div>
          <h3>Your Future Starts Today</h3>
          <p>Learn new skills. Explore new opportunities. Achieve your goals.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how">
        <div className="section-heading">
          <span>SIMPLE PROCESS</span>
          <h2>How SkillBridge Works</h2>
          <p>Start your career journey in just four simple steps.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Create Account</h3>
            <p>Register and create your student profile.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Add Your Skills</h3>
            <p>Enter your interests, skills and qualifications.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Get Recommendations</h3>
            <p>Explore suggested skills and career options.</p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <h3>Grow Your Career</h3>
            <p>Improve your skills and prepare for job opportunities.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <h2>Ready to Build Your Future?</h2>
        <p>Take the first step towards your dream career with SkillBridge.</p>
        <Link to="/register" className="cta-button">
          Join SkillBridge Today →
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Link to="/" className="logo">
          <span className="logo-icon">S</span>
          SkillBridge
        </Link>

        <p>Empowering Students. Connecting Careers.</p>
        <span>© 2026 SkillBridge. All Rights Reserved.</span>
      </footer>

    </div>
  );
}

export default Home;
