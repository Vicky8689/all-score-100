import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation();

  if (!state) return <h2>No Result Found</h2>;

  const {
    score,
    total,
    correct,
    wrong,
    attempted,
    questions,
    answers,
  } = state;

  const percentage = ((score / total) * 100).toFixed(2);

  return (
    <div className="result-page">

      <h1>Mock Test Result</h1>

      <div className="summary-card">
        <h3>Summary</h3>

        <p>Total Questions : {total}</p>
        <p>Attempted : {attempted}</p>
        <p>Correct : {correct}</p>
        <p>Wrong : {wrong}</p>
        <p>Score : {score}</p>
        <p>Percentage : {percentage}%</p>
      </div>

      <hr />

      <h2>Question Summary</h2>

      {questions.map((q, index) => {
        const selected = answers[q.id];

        return (
          <div key={q.id} className="question-review">

            <h4>
              Q{index + 1}. {q.question}
            </h4>

            <p>
              Your Answer :
              <span
                style={{
                  color:
                    selected === q.answer ? "green" : "red",
                }}
              >
                {" "}
                {selected || "Not Attempted"}
              </span>
            </p>

            <p>
              Correct Answer :
              <span style={{ color: "green" }}>
                {" "}
                {q.answer}
              </span>
            </p>

            <details>
              <summary>View Solution</summary>

              <div>
                {q.solution || "Solution not available"}
              </div>
            </details>

          </div>
        );
      })}
    </div>
  );
};

export default ResultPage;