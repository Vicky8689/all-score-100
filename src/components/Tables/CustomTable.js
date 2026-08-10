import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/common.css';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material';


// ======================================================
// Styled Table Cell
// ======================================================

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


// ======================================================
// Styled Table Row
// ======================================================

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
    },
}));


// ======================================================
// Question Levels
// ======================================================

const QUESTION_LEVELS = [
    {
        id: 1,
        name: 'Easy'
    },
    {
        id: 2,
        name: 'Medium'
    },
    {
        id: 3,
        name: 'Hard'
    },
    {
        id: 4,
        name: 'Random'
    }
];


// ======================================================
// Custom Table
// ======================================================

const CustomTable = ({ data }) => {

    const navigate = useNavigate();


    // ==================================================
    // Popup State
    // ==================================================

    const [openTestPopup, setOpenTestPopup] = useState(false);


    // ==================================================
    // Selected Test Row
    // ==================================================

    const [selectedRow, setSelectedRow] = useState(null);


    // ==================================================
    // Test Configuration
    // ==================================================

    // Default = Random
    // Random ID = 4
    const [questionLevel, setQuestionLevel] = useState(4);

    // Default number of questions
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);


    // ==================================================
    // Notes Click
    // ==================================================

    const handleNotesTypeClick = (row) => {

        console.log('Notes Row:', row);

        navigate(`/pdf/${row.id}/${row.srNo}`);
    };


    // ==================================================
    // Video Click
    // ==================================================

    const handleVideoTypeClick = (row) => {

        console.log('Video Row:', row);

        navigate(`/videos/${row.id}`);
    };


    // ==================================================
    // Test Click
    // ==================================================

    const handleTestClick = (row) => {

        console.log('Selected Test:', row);

        // Store selected test
        setSelectedRow(row);

        // Reset popup values
        setQuestionLevel(4); // Random

        setNumberOfQuestions(10);

        // Open popup
        setOpenTestPopup(true);
    };


    // ==================================================
    // Close Popup
    // ==================================================

    const handleCloseTestPopup = () => {

        setOpenTestPopup(false);

        setSelectedRow(null);
    };


    // ==================================================
    // Question Number Change
    // ==================================================

    const handleQuestionNumberChange = (e) => {

        const value = e.target.value;


        // Allow empty input while typing
        if (value === '') {

            setNumberOfQuestions('');

            return;
        }


        const number = Number(value);


        // Minimum = 1
        if (number < 1) {

            setNumberOfQuestions(1);

            return;
        }


        // Maximum = 200
        if (number > 200) {

            setNumberOfQuestions(200);

            return;
        }


        setNumberOfQuestions(number);
    };


    // ==================================================
    // Start Test
    // ==================================================

    const handleStartTest = () => {

        // Safety check
        if (!selectedRow) {

            return;
        }


        // Validate question count
        if (
            numberOfQuestions === '' ||
            numberOfQuestions < 1 ||
            numberOfQuestions > 200
        ) {

            alert(
                'Number of questions must be between 1 and 200.'
            );

            return;
        }


        // Get selected difficulty object
        const selectedLevel = QUESTION_LEVELS.find(
            (level) => level.id === questionLevel
        );


        console.log('Starting Test');

        console.log({
            testId: selectedRow.id,
            levelId: questionLevel,
            levelName: selectedLevel?.name,
            numberOfQuestions: numberOfQuestions
        });


        // ==================================================
        // Navigate
        // ==================================================

        navigate(
            `/mock-test/${selectedRow.id}?levelId=${questionLevel}&numberOfQuestions=${numberOfQuestions}`
        );


        // Close popup
        setOpenTestPopup(false);

        setSelectedRow(null);
    };


    // ==================================================
    // UI
    // ==================================================

    return (
        <>
            {/* ==================================================
                TABLE
            ================================================== */}

            <TableContainer component={Paper}>

                <Table
                    sx={{ minWidth: 700 }}
                    aria-label="customized table"
                >

                    {/* ================= TABLE HEADER ================= */}

                    <TableHead>

                        <TableRow>

                            <StyledTableCell>
                                Sr.no
                            </StyledTableCell>

                            <StyledTableCell>
                                Topic (Chapters)
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                Notes Type
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                Lecture Type
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                Test Series
                            </StyledTableCell>

                        </TableRow>

                    </TableHead>


                    {/* ================= TABLE BODY ================= */}

                    <TableBody>

                        {data.map((row) => (

                            <StyledTableRow key={row.id}>

                                {/* ================= SR NO ================= */}

                                <StyledTableCell>

                                    {row.srNo}

                                </StyledTableCell>


                                {/* ================= TOPIC ================= */}

                                <StyledTableCell>

                                    {row.topic}

                                </StyledTableCell>


                                {/* ================= NOTES ================= */}

                                <StyledTableCell
                                    align="left"
                                    style={{
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                        handleNotesTypeClick(row)
                                    }
                                >

                                    {row.notesType}

                                </StyledTableCell>


                                {/* ================= VIDEO ================= */}

                                <StyledTableCell
                                    align="left"
                                    style={{
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                        handleVideoTypeClick(row)
                                    }
                                >

                                    {row.lectureType}

                                </StyledTableCell>


                                {/* ================= TEST ================= */}

                                <StyledTableCell
                                    align="left"
                                    style={{
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                        handleTestClick(row)
                                    }
                                >

                                    {row.testSeries}

                                </StyledTableCell>

                            </StyledTableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>


            {/* ==================================================
                TEST CONFIGURATION POPUP
            ================================================== */}

            <Dialog
                open={openTestPopup}
                onClose={handleCloseTestPopup}
                fullWidth
                maxWidth="sm"
            >

                {/* ================= TITLE ================= */}

                <DialogTitle>

                    Start Mock Test

                </DialogTitle>


                {/* ================= CONTENT ================= */}

                <DialogContent>

                    {/* Selected Test */}

                    {selectedRow && (

                        <div
                            style={{
                                marginBottom: '20px',
                                marginTop: '10px'
                            }}
                        >

                            <strong>
                                Test:
                            </strong>

                            {' '}

                            {selectedRow.testSeries}

                        </div>

                    )}


                    {/* ==================================================
                        QUESTION LEVEL
                    ================================================== */}

                    <FormControl
                        fullWidth
                        margin="normal"
                    >

                        <InputLabel id="question-level-label">

                            Question Level

                        </InputLabel>


                        <Select
                            labelId="question-level-label"
                            value={questionLevel}
                            label="Question Level"
                            onChange={(e) =>
                                setQuestionLevel(
                                    Number(e.target.value)
                                )
                            }
                        >

                            {QUESTION_LEVELS.map((level) => (

                                <MenuItem
                                    key={level.id}
                                    value={level.id}
                                >

                                    {level.name}

                                </MenuItem>

                            ))}

                        </Select>

                    </FormControl>


                    {/* ==================================================
                        NUMBER OF QUESTIONS
                    ================================================== */}

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Number of Questions"
                        type="number"
                        value={numberOfQuestions}
                        onChange={handleQuestionNumberChange}
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                max: 200
                            }
                        }}
                        helperText="Minimum: 1 | Maximum: 200"
                    />

                </DialogContent>


                {/* ================= ACTIONS ================= */}

                <DialogActions>

                    {/* Cancel */}

                    <Button
                        onClick={handleCloseTestPopup}
                        color="inherit"
                    >

                        Cancel

                    </Button>


                    {/* Start Test */}

                    <Button
                        onClick={handleStartTest}
                        variant="contained"
                    >

                        Start Test

                    </Button>

                </DialogActions>

            </Dialog>

        </>
    );
};


export default CustomTable;