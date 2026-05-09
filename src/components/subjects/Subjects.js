import React, { useEffect, useState } from 'react';
import './Subject.css';
import { GetCoursesSubjectsById } from '../../Services/courseService';
//import '../../assets/common.css';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';
export default function Subjects() {
  const {courseId } = useParams();
const [courseData, setCourseData] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const data = await GetCoursesSubjectsById(courseId);
      console.log("this is data");
      console.log(data);
      setCourseData(data);   
    } catch (err) {
      console.error(err);
    }
  };

  loadData();
}, []);

   

  
  const navigate = useNavigate();
  
  const handleOptionClick = ( optionId) => {
    const courseProps = {   optionId };
    
     
      navigate('/table', { state: { ...courseProps } });
   
  }
  
  return (
    <>
    <Navbar/>
    <div className="courses-container">
      {courseData.map((course, index) => (
        <div key={index} className="course-card">
          <h1 className="course-title">{course.title}</h1>
          <div className="course-options">
           {course.options.map((option) => (
  <button 
    key={option.optionId} 
    className="course-btn" 
    onClick={() => handleOptionClick(option.optionId)}
  >
    {option.optionName}
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
