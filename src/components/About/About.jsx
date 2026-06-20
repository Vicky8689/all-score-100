import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";

const About = () => {

  const navigate = useNavigate();

  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: true,
    });

  }, []);

  return (
    <section className="modern-about-section">

      <div className="container">

        <div className="row align-items-center">

          {/* LEFT IMAGES */}
          <div
            className="col-lg-6"
            data-aos="fade-right"
          >

            <div className="about-image-wrapper">

              <img
                src="/img/About1.jpg"
                alt="Institute"
                className="about-main-image"
              />

              <img
                src="/img/About2.jpg"
                alt="Students"
                className="about-floating-image"
              />

              <div className="experience-badge">

                <h2>15+</h2>
                <span>Years Experience</span>

              </div>

            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div
            className="col-lg-6"
            data-aos="fade-left"
          >

            <div className="about-content">

              <span className="section-tag">
                ABOUT OUR INSTITUTE
              </span>

              <h1>
                ALL SCORES 100
                <br />
                EDUCATION CENTER
              </h1>

              <p>
                All Scores 100 is one of Navi Mumbai’s
                leading education institutes focused on
                IIT-JEE, NEET, MHT-CET and Board Exam preparation.
              </p>

              <p>
                Established in 2010 by Prof. Er. Suresh Kumar Yadav,
                the institute provides high-quality education,
                expert faculty, structured notes,
                test series and mentorship at affordable fees.
              </p>

              {/* FEATURES */}
              <div className="about-features">

                <div className="feature-item">
                  ✅ Expert Faculty
                </div>

                <div className="feature-item">
                  ✅ Mock Tests & Analytics
                </div>

                <div className="feature-item">
                  ✅ Affordable Fees
                </div>

                <div className="feature-item">
                  ✅ Structured Study Material
                </div>

              </div>

              {/* BUTTONS */}
              <div className="about-buttons">

                <button
                  className="primary-btn"
                  onClick={() => navigate("/about")}
                >
                  Explore More
                </button>

                <button
                  className="secondary-btn"
                >
                  Watch Demo
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;