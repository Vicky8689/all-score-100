import React from 'react';
import './table.css';
import CustomTable from './CustomTable';  // Import the reusable table component

const paperData = [
  { srNo: 1, topic: 'Units and Measurements', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 2, topic: 'Mathematical Methods', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  { srNo: 3, topic: 'Motion in a Plane', notesType: 'Theory', lectureType: 'Video', testSeries: 'Mock Test' },
  
];

const SingleTable = () => (
    <div className="form-container">
      {/* <h2>{title} {option}</h2> Display the title and option */}
      
  <CustomTable data={paperData} />
  </div>
);

export default SingleTable;
