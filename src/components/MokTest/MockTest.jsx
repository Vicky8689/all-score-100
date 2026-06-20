import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MockTest.css";

const MockTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [examStarted, setExamStarted] = useState(false);

  const currentQuestion = questions[currentIndex];

  // ================= FETCH API =================
  useEffect(() => {
    setLoading(true);

    fetch(`https://localhost:7010/api/Exam/by-subject/${testId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setTimeLeft((data.durationInMinutes || 10) * 60);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [testId]);

  // ================= START EXAM =================
  const startExam = () => {
    // enterFullScreen();
    setExamStarted(true);
  };

  // ================= TIMER =================
  useEffect(() => {
    if (!examStarted) return;

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

    return () => clearInterval(timer);
  }, [examStarted]);

 
  // ================= EXIT WARNING =================
  useEffect(() => {
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  // ================= FORMAT TIME =================
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ================= ACTIONS =================
  const selectOption = (opt) => {
    if (!currentQuestion) return;

    setAnswers({
      ...answers,
      [currentQuestion.id]: opt,
    });
  };

  const toggleMark = () => {
    if (!currentQuestion) return;

    setMarked({
      ...marked,
      [currentQuestion.id]: !marked[currentQuestion.id],
    });
  };

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpTo = (i) => setCurrentIndex(i);

  // ================= SUBMIT =================
const handleSubmit = () => {
  let score = 0;
  let correct = 0;
  let wrong = 0;
  let attempted = 0;

  questions.forEach((q) => {
    const selected = answers[q.id];

    if (selected) attempted++;

    if (selected === q.answer) {
      score++;
      correct++;
    } else if (selected) {
      wrong++;
    }
  });

  navigate("/result", {
    state: {
      score,
      total: questions.length,
      correct,
      wrong,
      attempted,
      questions,
      answers,
    },
  });
};

  // ================= LOADING =================
  if (loading) return <h2>Loading Exam...</h2>;

  // ================= UI =================
  return (
    <div className="exam-container">

      {/* START SCREEN */}
      {!examStarted ? (
        <div className="start-screen">
          <h2>Mock Exam</h2>
          <p>Test ID: {testId}</p>
          <p>Total Questions: {questions.length}</p>
          <p>Time: {Math.floor(timeLeft / 60)} Minutes</p>

          <button className="start-btn" onClick={startExam}>
            Start Exam
          </button>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="exam-header">
            <div>
              <h2>Mock Exam</h2>
              <p>Test ID: {testId}</p>
            </div>

            <div className="timer">⏱ {formatTime(timeLeft)}</div>
          </div>

          {/* BODY */}
          <div className="exam-body">

            {/* QUESTION */}
            <div className="question-box">
              <h3>
                Q{currentIndex + 1}. {currentQuestion?.question}
              </h3>

              <div className="options">
                {currentQuestion?.options?.map((opt, i) => (
                  <div
                    key={i}
                    className={`option ${
                      answers[currentQuestion.id] === opt
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => selectOption(opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>

              <button className="mark-btn" onClick={toggleMark}>
                {marked[currentQuestion?.id]
                  ? "Marked ✔"
                  : "Mark for Review"}
              </button>
            </div>

            {/* SIDEBAR */}
            <div className="sidebar">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`q-box ${
                    answers[q.id]
                      ? "answered"
                      : marked[q.id]
                      ? "marked"
                      : ""
                  }`}
                  onClick={() => jumpTo(i)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="footer">
            <button onClick={prev} disabled={currentIndex === 0}>
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button className="submit" onClick={handleSubmit}>
                Submit Exam
              </button>
            ) : (
              <button onClick={next}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MockTest;