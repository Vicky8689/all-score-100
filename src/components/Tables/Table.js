import React, { useState } from 'react';
import './table.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#e89381',
    cursor: 'pointer',
    transform: 'scale(1.01)',
  },
}));

function createData(srNo, topic, notesType, lectureType, testSeries) {
  return { srNo, topic, notesType, lectureType, testSeries };
}

const paper1data = [
  createData(1, 'Units and Measurements', 'Theory', 'Video', 'Mock Test'),
  createData(2, 'Mathematical Methods', 'Theory', 'Video', 'Mock Test'),
  createData(3, 'Motion in a Plane', 'Theory', 'Video', 'Mock Test'),
  createData(4, 'Laws of Motion', 'Theory', 'Video', 'Mock Test'),
  createData(5, 'Gravitation', 'Theory', 'Video', 'Mock Test'),
  createData(6, 'Mechanical Properties of Solids', 'Theory', 'Video', 'Mock Test'),
  createData(7, 'Thermal Properties of Matter', 'Theory', 'Video', 'Mock Test'),
  createData(8, 'Thermal Properties of Matter', 'Theory', 'Video', 'Mock Test'),
  createData(9, 'Thermal Properties of Matter', 'Theory', 'Video', 'Mock Test'),
  createData(10, 'Thermal Properties of Matter', 'Theory', 'Video', 'Mock Test'),
];

const paper2data = [
  createData(1, 'Sound', 'Theory', 'Video', 'Mock Test'),
  createData(2, 'Optics', 'Theory', 'Video', 'Mock Test'),
  createData(3, 'Electrostatics', 'Theory', 'Video', 'Mock Test'),
  createData(4, 'Electric Current Through Conductors', 'Theory', 'Video', 'Mock Test'),
  createData(5, 'Magnetism', 'Theory', 'Video', 'Mock Test'),
  createData(6, 'Electromagnetic Waves and Communication System', 'Theory', 'Video', 'Mock Test'),
  createData(7, 'Semiconductors', 'Theory', 'Video', 'Mock Test'),
  createData(8, 'Semiconductors', 'Theory', 'Video', 'Mock Test'),
  createData(9, 'Semiconductors', 'Theory', 'Video', 'Mock Test'),
  createData(10, 'Semiconductors', 'Theory', 'Video', 'Mock Test'),
];

const CustomTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Sr.no</StyledTableCell>
          <StyledTableCell align="left">Topic (Chapters)</StyledTableCell>
          <StyledTableCell align="left">Notes Type</StyledTableCell>
          <StyledTableCell align="left">Lecture Type</StyledTableCell>
          <StyledTableCell align="left">Test Series</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <StyledTableRow key={row.srNo}>
            <StyledTableCell component="th" scope="row">{row.srNo}</StyledTableCell>
            <StyledTableCell align="left">{row.topic}</StyledTableCell>
            <StyledTableCell align="left">{row.notesType}</StyledTableCell>
            <StyledTableCell align="left">{row.lectureType}</StyledTableCell>
            <StyledTableCell align="left">{row.testSeries}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const MngTable = () => {
  const [isPaperOneSelected, setIsPaperOneSelected] = useState(true);
  const location = useLocation();
  const { title, option } = location.state || {}; // Get props passed from Subjects

  return (
    <div className="form-container">
      <h2>{title} - {option}</h2> {/* Display the title and option */}
      <div className="tab">
        <button onClick={() => setIsPaperOneSelected(true)} className={isPaperOneSelected ? 'active' : ''}>Paper I</button>
        <button onClick={() => setIsPaperOneSelected(false)} className={!isPaperOneSelected ? 'active' : ''}>Paper II</button>
      </div>

      {isPaperOneSelected ? <CustomTable data={paper1data} /> : <CustomTable data={paper2data} />}
    </div>
  );
};

export default MngTable;
