import React, { useEffect, useState } from "react";
import "./Services.css";
import { getCourses } from "../../Services/commonService";
import { useNavigate } from "react-router-dom";

const CourseList = () => {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="courses-wrapper">

      {/* SECTION HEADER */}
      <div className="course-heading">

        <span className="course-subtitle">
          OUR COURSES
        </span>

        <h2>
          Courses Built Specifically
          For Your Career
        </h2>

        <p>
          Structured learning paths for NEET,
          JEE & MHT-CET preparation.
        </p>

      </div>

      {/* COURSE GRID */}
      <div className="course-grid">

        {courses.map((course, index) => (

          <div
            className="modern-course-card"
            key={course.courseId}
            data-aos="fade-up"
            data-aos-delay={(index + 1) * 100}
          >

            {/* TOP GRADIENT */}
            <div className="card-top">

              <div className="course-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>

              <span className="course-badge">
                Popular
              </span>

            </div>

            {/* CONTENT */}
            <div className="course-content">

              <h3>
                {course.title}
              </h3>

              <p>
                {course.description}
              </p>

              {/* FEATURES */}
              <div className="course-features">

                <div className="feature">
                  📚 Notes
                </div>

                <div className="feature">
                  🎥 Videos
                </div>

                <div className="feature">
                  📝 Tests
                </div>

              </div>

              {/* FOOTER */}
              <div className="course-footer">

                <div className="students">
                  500+ Students
                </div>

                <button
                  className="explore-btn"
                  onClick={() =>
                    navigate(`/courses/${course.courseId}/subjects`)
                  }
                >
                  Explore →
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default CourseList;