import React from 'react';

const QuestionCard = ({ question, index, totalQuestions, selectedOption, onSelect }) => {
  return (
    <div className="card border-0 shadow-sm p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="badge bg-primary px-3 py-2">Question {index + 1} of {totalQuestions}</span>
        <span className="text-muted small">Max Marks: 4</span>
      </div>

      <h5 className="mb-4 lh-base fw-bold text-dark">{question.question}</h5>

      <div className="options-list">
        {question.options.map((option, i) => (
          <div 
            key={i} 
            className={`option-item p-3 mb-3 border rounded cursor-pointer d-flex align-items-center transition-all ${selectedOption === option ? 'border-primary bg-light' : 'bg-white'}`}
            onClick={() => onSelect(question.id, option)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`radio-circle me-3 d-flex align-items-center justify-content-center rounded-circle border ${selectedOption === option ? 'border-primary bg-primary' : 'border-secondary'}`} style={{ width: '20px', height: '20px' }}>
              {selectedOption === option && <div className="bg-white rounded-circle" style={{ width: '8px', height: '8px' }}></div>}
            </div>
            <span className={selectedOption === option ? 'fw-bold text-primary' : 'text-dark'}>{option}</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .option-item:hover {
          background-color: #f8f9fa;
        }
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
      `}} />
    </div>
  );
};

export default QuestionCard;
