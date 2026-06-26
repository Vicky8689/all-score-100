import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMockTestBySubject } from "../../Services/mockTestService";
import { Container } from "react-bootstrap";
import { 
  ArrowBack, 
  AssignmentOutlined, 
  AccessTimeOutlined, 
  EmojiEventsOutlined, 
  CheckCircleOutline, 
  Computer, 
  Wifi, 
  InfoOutlined, 
  PlayArrow,
  ArrowForward,
  AccountCircleOutlined
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "./MockTestStartPage.css";

const MockTestStartPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [browserName, setBrowserName] = useState("Modern Browser");

  useEffect(() => {
    // Fetch logged in user
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    // Detect browser
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Chrome") > -1) {
      setBrowserName("Google Chrome");
    } else if (userAgent.indexOf("Safari") > -1) {
      setBrowserName("Safari");
    } else if (userAgent.indexOf("Firefox") > -1) {
      setBrowserName("Mozilla Firefox");
    } else if (userAgent.indexOf("Edge") > -1) {
      setBrowserName("Microsoft Edge");
    } else {
      setBrowserName("Modern Browser");
    }
  }, []);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getMockTestBySubject(testId);
        setTest(data);
      } catch (error) {
        console.error("Error fetching test", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId]);

  const studentName = user?.userName || "Student";
  const userInitials = studentName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="mt-loading-screen">
        <div className="mt-spinner-ring"></div>
        <div className="mt-loading-text">Preparing your examination environment...</div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="mt-loading-screen">
        <h4 className="text-danger mb-3">Examination Not Found</h4>
        <p className="text-muted mb-4">The test you are trying to access is unavailable or has been removed.</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary px-4 py-2 rounded-3 shadow">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const instructions = [
    "Ensure you have a stable internet connection. The exam will automatically submit when the timer expires.",
    "Do not refresh the browser or navigate away from the exam page during the test, or you may lose progress.",
    "Each question carries equal marks. Review your answers carefully before completing.",
    "Ensure your workspace is quiet and free from distractions. Once started, the exam cannot be paused."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mock-test-container py-5"
    >
      <Container style={{ maxWidth: '900px' }}>
        
        {/* Navigation Back */}
        <div className="mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="mt-back-btn btn p-0 d-inline-flex align-items-center"
          >
            <ArrowBack className="me-2" style={{ fontSize: '1.15rem' }} /> Back to Dashboard
          </button>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-glass-card"
        >
          {/* Hero Banner Header */}
          <div className="mt-hero-header">
            <div className="mt-hero-grid"></div>
            <div className="mt-hero-glow"></div>
            <div className="position-relative z-index-1">
              <span className="mt-hero-badge">Official Assessment</span>
              <h1 className="mt-hero-title">{test.title || "Mock Examination"}</h1>
              <p className="mt-hero-subtitle mb-0">Logged in as: <strong>{studentName}</strong></p>
            </div>
          </div>

          <div className="p-4 p-md-5">
            {/* Quick Stats Grid */}
            <div className="mt-stat-grid">
              {[
                { 
                  label: "Questions", 
                  value: test.questions?.length || 0,
                  icon: <AssignmentOutlined style={{ fontSize: '1.5rem' }} /> 
                },
                { 
                  label: "Duration", 
                  value: `${test.durationInMinutes || 0} Min`,
                  icon: <AccessTimeOutlined style={{ fontSize: '1.5rem' }} /> 
                },
                { 
                  label: "Total Marks", 
                  value: `${test.totalMarks || 0} Pts`,
                  icon: <EmojiEventsOutlined style={{ fontSize: '1.5rem' }} /> 
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="mt-stat-card"
                >
                  <div className="mt-stat-icon-wrapper">
                    {item.icon}
                  </div>
                  <div className="mt-stat-value">{item.value}</div>
                  <div className="mt-stat-label">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Split Content Panels */}
            <div className="mt-content-panels">
              {/* Left Panel: Instructions */}
              <div>
                <h3 className="mt-section-title">
                  <InfoOutlined /> Instructions & Guidelines
                </h3>
                <div className="mt-instructions-list">
                  {instructions.map((inst, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      className="mt-instruction-item"
                    >
                      <div className="mt-instruction-num">{index + 1}</div>
                      <div className="mt-instruction-text">{inst}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Panel: Side Status Check */}
              <div>
                {/* Profile Box */}
                <div className="mt-sidebar-box">
                  <h4 className="mt-section-title mb-3" style={{ fontSize: '1.1rem' }}>
                    Candidate Profile
                  </h4>
                  <div className="mt-user-profile">
                    <div className="mt-user-avatar">{userInitials}</div>
                    <div>
                      <div className="mt-user-name">{studentName}</div>
                      <div className="mt-user-role">Student Account</div>
                    </div>
                  </div>
                </div>

                {/* System Diagnostics */}
                <div className="mt-sidebar-box">
                  <h4 className="mt-section-title mb-3" style={{ fontSize: '1.1rem' }}>
                    System Readiness
                  </h4>
                  <div className="mt-sys-list">
                    <div className="mt-sys-item">
                      <span className="mt-sys-label"><Computer /> OS / Browser</span>
                      <span className="mt-sys-status text-truncate" style={{ maxWidth: '120px' }}>{browserName}</span>
                    </div>
                    <div className="mt-sys-item">
                      <span className="mt-sys-label"><Wifi /> Network</span>
                      <span className="mt-sys-status success">
                        <CheckCircleOutline /> Stable
                      </span>
                    </div>
                    <div className="mt-sys-item">
                      <span className="mt-sys-label"><CheckCircleOutline /> Mode</span>
                      <span className="mt-sys-status success">
                        <CheckCircleOutline /> Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="mt-footer-action d-flex flex-column gap-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-disclaimer-box"
              >
                <InfoOutlined />
                <span>
                  <strong>Note:</strong> By starting the exam, you acknowledge that you are ready. The timer starts immediately and cannot be paused.
                </span>
              </motion.div>

              <div className="d-flex justify-content-center justify-content-md-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/mock-test/${testId}/run`)}
                  className="mt-start-btn mt-pulse-btn btn btn-primary text-white d-flex align-items-center gap-2"
                >
                  <PlayArrow /> Start Mock Test Now <ArrowForward />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

      </Container>
    </motion.div>
  );
};

export default MockTestStartPage;
