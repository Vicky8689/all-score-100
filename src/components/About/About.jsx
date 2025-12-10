import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

const About = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div
      className="container-fluid py-5 my-5"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="container pt-5">
        <div className="row g-5">
          {/* Left Section: Images */}
          <div
            className="col-lg-5 col-md-6 col-sm-12 wow fadeIn"
            data-wow-delay=".3s"
          >
            <div className="h-100 position-relative">
              <img
                src="/img/About1.jpg"
                className="img-fluid w-75 rounded"
                alt="Education center view"
                style={{ marginBottom: "25%" }}
              />
              <div
                className="position-absolute w-75"
                style={{ top: "25%", left: "25%" }}
              >
                <img
                  src="/img/About2.jpg"
                  className="img-fluid w-100 rounded"
                  alt="Classroom view"
                />
              </div>
            </div>
          </div>

          {/* Right Section: Content */}
          <div
            className="col-lg-7 col-md-6 col-sm-12 wow fadeIn"
            data-wow-delay=".5s"
          >
            <h5 className="text-primary">About Us</h5>
            <h1 className="mb-4">ALL SCORES 100 EDUCATION CENTER</h1>
            <p>
              All Scores 100 is one of the best education centers established in
              the year 2010 in Navi Mumbai and Mumbai by Prof. Er. Suresh Kumar
              Yadav. It provides world-class teaching to the aspirants of IIT
              JEE (Main and Advanced) and NEET, including all boards and state
              entrance exams (MH-CET) at a very low cost. The cost is unmatched,
              providing authenticated study materials and fully-fledged
              lectures.
            </p>
            <p className="mb-4">
              The aim and objective of the institute are to provide world-class
              education worldwide.
            </p>

            {/* ✅ Updated clickable button that navigates to /about */}
            <button
              onClick={() => navigate("/about")}
              className="btn btn-secondary rounded-pill px-5 py-3 text-white"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
