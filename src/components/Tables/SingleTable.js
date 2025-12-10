import React from 'react';
//import './table.css';
import '../../assets/common.css';

import CustomTable from './CustomTable';  // Import the reusable table component
import Navbar from '../NavBar/Navbar';

const paperData = [
  {
    srNo: 1,
    topic: 'Units and Measurements',
    notesType: 'Theory',
    lectureType: 'Video',
    testSeries: 'Mock Test',
    videos: [
      {
        id: 1,
        title: "Units and Measurements, Units and Dimensions - by Toyu Tua",
        url: "https://youtu.be/tx76BJIqOd4?si=OtPlfmHQqwOXeyv0",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 2,
        title: "Motion in One Dimension - by Toyu Tua",
        url: "https://youtu.be/HYQdPGN3ZXQ?si=w4dJPPghsVhihTpL",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 3,
        title: "Significant Figures & Errors - by Toyu Tua",
        url: "https://youtu.be/0sxBoDlJ9x8?si=QUevkbj6o5A0rxBA",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 4,
        title: "Video 4",
        url: "https://www.youtube.com/embed/_X4it3QUKt0",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 5,
        title: "Video 5",
        url: "https://www.youtube.com/embed/hss3o66NxwU",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 6,
        title: "Video 6",
        url: "https://www.youtube.com/embed/YGGg9ecy0K4",
        thumbnail: "img/admin.jpg"
      },
    ]
  },
  {
    srNo: 2,
    topic: 'Mathematical Methods',
    notesType: 'Theory',
    lectureType: 'Video',
    testSeries: 'Mock Test',
    videos: [
      {
        id: 1,
        title: "Video 7",
        url: "https://www.youtube.com/embed/0u9k-kOR3KE",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 2,
        title: "Video 8",
        url: "https://www.youtube.com/embed/8Tr_JiktpBk",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 3,
        title: "Video 9",
        url: "https://www.youtube.com/embed/Fo_SED11gME",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 4,
        title: "Video 10",
        url: "https://www.youtube.com/embed/_X4it3QUKt0",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 5,
        title: "Video 11",
        url: "https://www.youtube.com/embed/hss3o66NxwU",
        thumbnail: "img/admin.jpg"
      },
      {
        id: 6,
        title: "Video 13",
        url: "https://www.youtube.com/embed/YGGg9ecy0K4",
        thumbnail: "img/admin.jpg"
      },
    ]
  },
];








const SingleTable = () => (
<><Navbar/>
    <div className="form-container">
      
      
  <CustomTable data={paperData} />
  </div>
  </>
);

export default SingleTable;
