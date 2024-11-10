import React from 'react';
import './table.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Styled table components
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
    // transform: 'scale(1.01)',
  },
}));

// Reusable Table Component
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

export default CustomTable;
