import React from 'react';
import './Subject.css';
//import '../../assets/common.css';

import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
export default function Subjects() {
  const courseData = [
    { title: 'PHY', options: ['11TH', '12TH'] },
    { title: 'CHEM', options: ['11TH', '12TH'] },
    { title: 'MATH', options: ['11TH', '12TH'] },
    { title: 'JEE', options: ['11TH', '12TH'] },
    { title: 'NEET', options: ['11TH', '12TH'] },
  ];
  
  const navigate = useNavigate();
  
  const handleOptionClick = (courseTitle, option) => {
    const courseProps = { title: courseTitle, option };
    
    if (option === "11TH") {
      navigate('/table', { state: { ...courseProps } });
    }
    if (option === "12TH") {
      navigate('/pdf', { state: { ...courseProps } });
    }
  }
  
  return (
    <>
    <Navbar/>
    <div className="courses-container">
      {courseData.map((course, index) => (
        <div key={index} className="course-card">
          <h1 className="course-title">{course.title}</h1>
          <div className="course-options">
            {course.options.map((option, idx) => (
              <button 
                key={idx} 
                className="course-btn" 
                onClick={() => handleOptionClick(course.title, option)}>
                {option}
              </button>
            ))}
          </div>
          <Link to='/table'><button className="explore-btn">EXPLORE MORE</button></Link>
        </div>
      ))}
    </div>
    </>
  );
}
