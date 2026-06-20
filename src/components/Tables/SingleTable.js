import React, { useState,useEffect } from 'react';
//import './table.css';
import '../../assets/common.css';
import { GetBySubjectOptionById } from '../../Services/contentService';

import CustomTable from './CustomTable';  
import Navbar from '../NavBar/Navbar';
import { useLocation } from 'react-router-dom';






const SingleTable = () => {




  const location = useLocation();
  const optionData = location.state;
  const [contentData, setContentData] = useState([]);
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await GetBySubjectOptionById(optionData.optionId);
      console.log("this is data");
      console.log(data);
      setContentData(data);   
    } catch (err) {
      console.error(err);
    }
  };

  loadData();
}, []);




console.log(contentData);
  if (!contentData) {
    return <div>No data available. Please navigate from previous page.</div>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="form-container">
        <CustomTable data={contentData} />
      </div>
    </>
  );
};

export default SingleTable;
