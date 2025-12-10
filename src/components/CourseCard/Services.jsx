import React from "react";
import "./Services.css";  
// import '../../assets/common.css';

const courses = [
  {
    id: 1,
    title: "11th & 12th Science",
    description:
      "Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.",
    iconClass: "fas fa-flask",
  },
  {
    id: 2,
    title: "MHT - CET",
    description:
      "Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.",
    iconClass: "fas fa-graduation-cap",
  },
  {
    id: 3,
    title: "IIT JEE MAINS & ADVANCE",
    description:
      "Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.",
    iconClass: "fas fa-cog",
  },
  {
    id: 4,
    title: "MEDICAL",
    description:
      "Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.",
    iconClass: "fas fa-stethoscope",
  },
  {
    id: 5,
    title: "FOUNDATION COURSE / OLYMPIADS (ICSE|CBSE|SSC Boards)",
    description:
      "Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.",
    iconClass: "fas fa-book",
  },
  {
    id: 6,
    title: "Programming (IT / CS)",
    description:
      "Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.",
    iconClass: "fas fa-code",
  }
];

const CourseList = () => {
  return (
    <>
    <div className="text-center mx-auto pb-5" style={{ maxWidth: '600px' }}>
          <h5 className="text-primary">Our Courses</h5>
          <h1>Courses Built Specifically For Your Career</h1>
        </div>
    <div className="services">
      
    {courses.map((course) => (
      <div className="services-item" key={course.id}>
        <div className="services-content">
          <div className="services-content-icon">
            <i className={course.iconClass}></i>
          </div>
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <button 
              className="btn btn-secondary rounded-pill px-5 py-3 text-white">Read More</button>
        </div>
      </div>
    ))}
  </div>
  </>
  );
};

export default CourseList;
