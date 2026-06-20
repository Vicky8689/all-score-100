import React, { useState } from 'react';
//import './table.css';
import '../../assets/common.css';

import { useLocation } from 'react-router-dom';
import CustomTable from './CustomTable'; // Import the reusable table component
import Pagination from '@mui/material/Pagination';
import Navbar from '../NavBar/Navbar';
const paper1data = [
  { srNo: 1, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 2, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 4, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 5, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 6, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 7, topic: 'Mathematical Methods', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 8, topic: 'Mathematical Methods', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 9, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 10, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 11, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 12, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 13, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 { srNo: 14, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
{ srNo: 15, topic: 'Mathematical Methods', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
{ srNo: 16, topic: 'Mathematical Methods', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
{ srNo: 17 , topic: 'Mathematical Methods', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },

];

const paper2data = [
  { srNo: 1, topic: 'Sound', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 2, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 4, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 5, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 6, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 7, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 8, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 9, topic: 'Sound', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 10, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 11, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 12, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 13, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 14, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 15, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 16, topic: 'Optics', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
 
];

const ITEMS_PER_PAGE = 8; // Number of items per page

const MngTable = () => {
  const [isPaperOneSelected, setIsPaperOneSelected] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { title, option } = location.state || {}; // Get props passed from Subjects

  // Get the selected data based on the tab
  const selectedData = isPaperOneSelected ? paper1data : paper2data;

  // Calculate the paginated data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = selectedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
    {/* <Navbar/> */}
    <div className="form-container">
      {/* <h2>{title} {option}</h2> Display the title and option */}
      <div className="tab">
        <button
          onClick={() => {
            setIsPaperOneSelected(true);
            setCurrentPage(1); // Reset to the first page
          }}
          className={isPaperOneSelected ? 'active' : ''}
        >
          Paper I
        </button>
        <button
          onClick={() => {
            setIsPaperOneSelected(false);
            setCurrentPage(1); // Reset to the first page
          }}
          className={!isPaperOneSelected ? 'active' : ''}
        >
          Paper II
        </button>
      </div>

      {/* Use CustomTable to render the paginated data */}
      <CustomTable data={paginatedData} />

      {/* Pagination controls */}
      <Pagination
        count={Math.ceil(selectedData.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
    </>
  );
};

export default MngTable;
