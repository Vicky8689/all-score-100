import React from 'react';
import { CheckCircle, Cancel, HelpOutline } from '@mui/icons-material';

const SolutionCard = ({ question, index, userAnswer, isCorrect }) => {
  return (
    <div className={`card border-0 shadow-sm p-4 mb-4 ${isCorrect ? 'border-start border-5 border-success' : userAnswer ? 'border-start border-5 border-danger' : 'border-start border-5 border-warning'}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Question {index + 1}</h6>
        {isCorrect ? (
          <span className="text-success d-flex align-items-center fw-bold"><CheckCircle className="me-1" /> Correct</span>
        ) : userAnswer ? (
          <span className="text-danger d-flex align-items-center fw-bold"><Cancel className="me-1" /> Wrong</span>
        ) : (
          <span className="text-warning d-flex align-items-center fw-bold"><HelpOutline className="me-1" /> Skipped</span>
        )}
      </div>

      <p className="fw-bold mb-3">{question.question}</p>

      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <div className={`p-3 rounded h-100 ${isCorrect ? 'bg-success bg-opacity-10 border border-success' : 'bg-light border'}`}>
            <small className="text-muted d-block mb-1">Your Answer:</small>
            <span className={userAnswer ? 'fw-bold' : 'text-muted italic'}>{userAnswer || "Not Attempted"}</span>
          </div>
        </div>
        {!isCorrect && (
           <div className="col-md-6">
           <div className="p-3 rounded h-100 bg-success bg-opacity-10 border border-success">
             <small className="text-muted d-block mb-1">Correct Answer:</small>
             <span className="fw-bold text-success">{question.correctAnswer}</span>
           </div>
         </div>
        )}
      </div>

      <div className="bg-light p-3 rounded">
        <small className="text-muted d-block mb-2 fw-bold">Explanation:</small>
        <p className="mb-0 text-dark" style={{ fontSize: '0.9rem' }}>{question.explanation || "No explanation provided."}</p>
      </div>
    </div>
  );
};

export default SolutionCard;
