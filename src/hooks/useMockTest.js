import { useState, useEffect } from "react";

export const useMockTest = (testId, questions) => {
  const STORAGE_KEY = `mock_test_${testId}`;
  
  // Initial state from localStorage or defaults
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).answers : {};
  });

  const [status, setStatus] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).status : (questions || []).reduce((acc, q) => ({ ...acc, [q.id]: "not-visited" }), {});
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Auto-save to localStorage
  useEffect(() => {
    if (questions && questions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, status }));
    }
  }, [answers, status, STORAGE_KEY, questions]);

  const handleAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setStatus((prev) => ({ ...prev, [questionId]: "answered" }));
  };

  const markForReview = (questionId) => {
    setStatus((prev) => ({ ...prev, [questionId]: "review" }));
  };

  const clearAnswer = (questionId) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setStatus((prev) => ({ ...prev, [questionId]: "visited" }));
  };

  const visitQuestion = (index) => {
    setCurrentQuestionIndex(index);
    if (!questions[index]) return;
    const qId = questions[index].id;
    if (status[qId] === "not-visited") {
      setStatus((prev) => ({ ...prev, [qId]: "visited" }));
    }
  };

  /**
   * Formats local answer state to API format
   * Returns: [{ questionId, selectedAnswer }]
   */
  const getFormattedAnswers = () => {
    return Object.keys(answers).map(qId => ({
      questionId: parseInt(qId),
      selectedAnswer: answers[qId]
    }));
  };

  return {
    answers,
    status,
    currentQuestionIndex,
    handleAnswer,
    markForReview,
    clearAnswer,
    visitQuestion,
    getFormattedAnswers,
    setCurrentQuestionIndex,
    setAnswers,
    setStatus
  };
};
