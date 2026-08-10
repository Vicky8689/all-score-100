import React, { useEffect, useState } from "react";
import {
    useParams,
    useNavigate,
    useSearchParams
} from "react-router-dom";

import "./MockTest.css";

import {
    getMockTestBySubject
} from "../../services/examService";


const MockTest = () => {

    // ==================================================
    // ROUTE PARAM
    // ==================================================

    const { testId } = useParams();

    const navigate = useNavigate();


    // ==================================================
    // QUERY PARAMS
    //
    
    // ==================================================

    const [searchParams] = useSearchParams();

    const levelId = Number(
        searchParams.get("levelId")
    );

    const numberOfQuestions = Number(
        searchParams.get("questions")
    );


    // ==================================================
    // STATE
    // ==================================================

    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [timeLeft, setTimeLeft] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [answers, setAnswers] = useState({});

    const [marked, setMarked] = useState({});

    const [examStarted, setExamStarted] = useState(false);


    // ==================================================
    // CURRENT QUESTION
    // ==================================================

    const currentQuestion =
        questions[currentIndex];


    // ==================================================
    // FETCH MOCK TEST
    // ==================================================

    useEffect(() => {

        const fetchMockTest = async () => {

            try {

                setLoading(true);

                console.log(
                    "Fetching Mock Test:",
                    {
                        testId,
                        levelId,
                        numberOfQuestions
                    }
                );


                // ==========================================
                // CALL YOUR API SERVICE
                // ==========================================

                const data =
                    await getMockTestBySubject(
                        testId,
                        levelId,
                        numberOfQuestions
                    );


                console.log(
                    "Mock Test Response:",
                    data
                );


                // ==========================================
                // SET QUESTIONS
                // ==========================================

                setQuestions(
                    data.questions || []
                );


                // ==========================================
                // SET TIMER
                // ==========================================

                setTimeLeft(
                    (data.durationInMinutes || 10) * 60
                );


            } catch (error) {

                console.error(
                    "Error loading mock test:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        if (testId) {

            fetchMockTest();

        }

    }, [
        testId,
        levelId,
        numberOfQuestions
    ]);


    // ==================================================
    // START EXAM
    // ==================================================

    const startExam = () => {

        setExamStarted(true);

    };


    // ==================================================
    // TIMER
    // ==================================================

    useEffect(() => {

        if (!examStarted) {
            return;
        }


        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(timer);

                    handleSubmit();

                    return 0;
                }

                return prev - 1;

            });

        }, 1000);


        return () => {

            clearInterval(timer);

        };

    }, [examStarted]);


    // ==================================================
    // EXIT WARNING
    // ==================================================

    useEffect(() => {

        const warn = (e) => {

            if (!examStarted) {
                return;
            }

            e.preventDefault();

            e.returnValue = "";

        };


        window.addEventListener(
            "beforeunload",
            warn
        );


        return () => {

            window.removeEventListener(
                "beforeunload",
                warn
            );

        };

    }, [examStarted]);


    // ==================================================
    // FORMAT TIME
    // ==================================================

    const formatTime = (sec) => {

        const m = Math.floor(sec / 60);

        const s = sec % 60;

        return `${m}:${s < 10 ? "0" : ""}${s}`;

    };


    // ==================================================
    // SELECT OPTION
    // ==================================================

    const selectOption = (opt) => {

        if (!currentQuestion) {
            return;
        }


        setAnswers((prev) => ({

            ...prev,

            [currentQuestion.id]: opt

        }));

    };


    // ==================================================
    // MARK QUESTION
    // ==================================================

    const toggleMark = () => {

        if (!currentQuestion) {
            return;
        }


        setMarked((prev) => ({

            ...prev,

            [currentQuestion.id]:
                !prev[currentQuestion.id]

        }));

    };


    // ==================================================
    // NEXT
    // ==================================================

    const next = () => {

        if (
            currentIndex <
            questions.length - 1
        ) {

            setCurrentIndex(
                currentIndex + 1
            );

        }

    };


    // ==================================================
    // PREVIOUS
    // ==================================================

    const prev = () => {

        if (currentIndex > 0) {

            setCurrentIndex(
                currentIndex - 1
            );

        }

    };


    // ==================================================
    // JUMP TO QUESTION
    // ==================================================

    const jumpTo = (index) => {

        setCurrentIndex(index);

    };


    // ==================================================
    // SUBMIT EXAM
    // ==================================================

    const handleSubmit = () => {

        let score = 0;

        let correct = 0;

        let wrong = 0;

        let attempted = 0;


        // ==========================================
        // CALCULATE RESULT
        // ==========================================

        questions.forEach((q) => {

            const selected =
                answers[q.id];


            // Attempted
            if (selected) {

                attempted++;

            }


            // Correct
            if (selected === q.answer) {

                score++;

                correct++;

            }

            // Wrong
            else if (selected) {

                wrong++;

            }

        });


        console.log(
            "Exam Result:",
            {
                score,
                total: questions.length,
                correct,
                wrong,
                attempted
            }
        );


        // ==========================================
        // NAVIGATE RESULT
        // ==========================================

        navigate(
            "/result",
            {
                state: {

                    score,

                    total:
                        questions.length,

                    correct,

                    wrong,

                    attempted,

                    questions,

                    answers

                }
            }
        );

    };


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (
            <div className="loading">
                Loading Exam...
            </div>
        );

    }


    // ==================================================
    // NO QUESTIONS
    // ==================================================

    if (!questions.length) {

        return (
            <div className="no-questions">

                <h2>
                    No Questions Found
                </h2>

                <button
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>

            </div>
        );

    }


    // ==================================================
    // UI
    // ==================================================

    return (

        <div className="mock-test-container">


            {/* ==================================================
                START SCREEN
            ================================================== */}

            {!examStarted ? (

                <div className="start-screen">

                    <h2>
                        Mock Exam
                    </h2>


                    <p>
                        Test ID: {testId}
                    </p>


                    <p>
                        Level ID: {levelId}
                    </p>


                    <p>
                        Total Questions:
                        {" "}
                        {questions.length}
                    </p>


                    <p>
                        Time:
                        {" "}
                        {Math.floor(
                            timeLeft / 60
                        )}
                        {" "}
                        Minutes
                    </p>


                    <button
                        className="start-btn"
                        onClick={startExam}
                    >
                        Start Exam
                    </button>

                </div>

            ) : (

                <>

                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <div className="exam-header">

                        <div>

                            <h2>
                                Mock Exam
                            </h2>


                            <p>
                                Test ID:
                                {" "}
                                {testId}
                            </p>


                            <p>
                                Level ID:
                                {" "}
                                {levelId}
                            </p>

                        </div>


                        <div className="timer">

                            ⏱ {formatTime(timeLeft)}

                        </div>

                    </div>


                    {/* ==================================================
                        BODY
                    ================================================== */}

                    <div className="exam-body">


                        {/* ==================================================
                            QUESTION
                        ================================================== */}

                        <div className="question-box">

                            <h3>

                                Q{currentIndex + 1}.
                                {" "}
                                {currentQuestion?.question}

                            </h3>


                            {/* OPTIONS */}

                            <div className="options">

                                {currentQuestion?.options?.map(
                                    (opt, i) => (

                                        <div
                                            key={i}
                                            className={`
                                                option
                                                ${
                                                    answers[
                                                        currentQuestion.id
                                                    ] === opt
                                                        ? "selected"
                                                        : ""
                                                }
                                            `}
                                            onClick={() =>
                                                selectOption(opt)
                                            }
                                        >

                                            {opt}

                                        </div>

                                    )
                                )}

                            </div>


                            {/* MARK */}

                            <button
                                className="mark-btn"
                                onClick={toggleMark}
                            >

                                {marked[
                                    currentQuestion?.id
                                ]
                                    ? "Marked ✔"
                                    : "Mark for Review"
                                }

                            </button>

                        </div>


                        {/* ==================================================
                            SIDEBAR
                        ================================================== */}

                        <div className="sidebar">

                            {questions.map(
                                (q, i) => (

                                    <div
                                        key={q.id}
                                        className={`
                                            q-box
                                            ${
                                                answers[q.id]
                                                    ? "answered"
                                                    : marked[q.id]
                                                    ? "marked"
                                                    : ""
                                            }
                                        `}
                                        onClick={() =>
                                            jumpTo(i)
                                        }
                                    >

                                        {i + 1}

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==================================================
                        FOOTER
                    ================================================== */}

                    <div className="footer">


                        {/* PREVIOUS */}

                        <button
                            onClick={prev}
                            disabled={
                                currentIndex === 0
                            }
                        >

                            Previous

                        </button>


                        {/* NEXT / SUBMIT */}

                        {currentIndex ===
                        questions.length - 1 ? (

                            <button
                                className="submit"
                                onClick={handleSubmit}
                            >

                                Submit Exam

                            </button>

                        ) : (

                            <button
                                onClick={next}
                            >

                                Next

                            </button>

                        )}

                    </div>

                </>

            )}

        </div>

    );

};


export default MockTest;