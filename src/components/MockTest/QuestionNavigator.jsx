import React from 'react';

const QuestionNavigator = ({ questions, currentPageIndex, status, onNavigate }) => {
  const getStatusClass = (id) => {
    switch (status[id]) {
      case 'answered': return 'bg-success text-white';
      case 'review': return 'bg-warning text-dark';
      case 'visited': return 'bg-danger text-white';
      default: return 'bg-light text-dark';
    }
  };

  return (
    <div className="card border-0 shadow-sm p-3">
      <h6 className="fw-bold mb-3">Question Palette</h6>
      
      <div className="d-flex flex-wrap gap-2 mb-4">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => onNavigate(i)}
            className={`btn btn-sm d-flex align-items-center justify-content-center rounded-circle p-0 ${getStatusClass(q.id)} ${currentPageIndex === i ? 'border-dark border-3' : 'border-0'}`}
            style={{ width: '35px', height: '35px', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="legend mt-2 border-top pt-3">
        <div className="row g-2">
          <LegendItem color="#198754" label="Answered" />
          <LegendItem color="#ffc107" label="Review" />
          <LegendItem color="#dc3545" label="Not Answered" />
          <LegendItem color="#f8f9fa" border="#dee2e6" label="Not Visited" />
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, border, label }) => (
  <div className="col-6 d-flex align-items-center mb-1">
    <div style={{ 
      width: '12px', 
      height: '12px', 
      backgroundColor: color, 
      border: border ? `1px solid ${border}` : 'none',
      borderRadius: '2px' 
    }} className="me-2"></div>
    <span style={{ fontSize: '0.7rem' }}>{label}</span>
  </div>
);

export default QuestionNavigator;
