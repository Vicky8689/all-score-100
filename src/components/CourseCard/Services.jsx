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
    <>
      <div className="text-center mx-auto pb-5" style={{ maxWidth: "600px" }}>
        <h5 className="text-primary">Our Courses</h5>
        <h1>Courses Built Specifically For Your Career</h1>
      </div>

      <div className="services">
        {courses.map((course) => (
          <div className="services-item" key={course.courseId}>
            <div className="services-content">

              <div className="services-content-icon">
                <i className="fas fa-book"></i>
              </div>

              <h4>{course.title}</h4>
              <p>{course.description}</p>

              <button className="btn btn-secondary rounded-pill px-5 py-3 text-white"
              onClick={()=>navigate(`/courses/${course.courseId}/subjects`)}
              >
                Read More
              </button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseList;