import React, { useEffect, useState } from "react";
import "./Subject.css";
import { GetCoursesSubjectsById } from "../../Services/courseService";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

export default function Subjects() {

  const { courseId } = useParams();

  const [courseData, setCourseData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const loadData = async () => {

      try {

        const data = await GetCoursesSubjectsById(courseId);

        setCourseData(data);

      } catch (err) {

        console.error(err);

      }

    };

    loadData();

  }, [courseId]);

  const handleOptionClick = (optionId) => {

    navigate(`/courses/${courseId}/chapters`, {
      state: { optionId },
    }); 
  };

  return (
    <>

      {/* <Navbar /> */}

      {/* HERO */}
      {/* <section className="subject-hero">

        <div className="subject-overlay">

          <div className="container">

            <div className="subject-hero-content">

              <span>
                COURSE SUBJECTS
              </span>

              <h1>
                Choose Your Learning Path
              </h1>

              <p>
                Select subjects and start structured
                preparation with notes, lectures and mock tests.
              </p>

            </div>

          </div>

        </div>

      </section> */}

      {/* SUBJECT SECTION */}
      <section className="subjects-section">

        <div className="container">

          <div className="subjects-grid">

            {courseData.map((course, index) => (

              <div
                key={index}
                className="modern-subject-card"
              >

                {/* TOP */}
                <div className="subject-top">

                  <div className="subject-icon">
                    📘
                  </div>

                  <span className="subject-badge">
                    Popular
                  </span>

                </div>

                {/* CONTENT */}
                <div className="subject-content">

                  <h2>
                    {course.title}
                  </h2>

                  <p>
                    Structured study materials, video
                    lectures, MCQs and mock tests.
                  </p>

                  {/* OPTIONS */}
                  <div className="subject-options">

                    {course.options.map((option) => (

                      <button
                        key={option.optionId}
                        className="subject-option-btn"
                        onClick={() =>
                          handleOptionClick(option.optionId)
                        }
                      >

                        {option.optionName}

                      </button>

                    ))}

                  </div>

                  {/* FOOTER */}
                  <div className="subject-footer">

                    <div className="students-count">
                      1000+ Students
                    </div>

                    <button
                      className="subject-explore-btn"
                      onClick={() =>
                        navigate("/table")
                      }
                    >

                      Explore More →

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </>
  );
}