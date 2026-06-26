import React from 'react';

const ResultSummary = ({ results }) => {
  const items = [
    { label: "Total Questions", value: results.total, color: "#6c757d" },
    { label: "Attempted", value: results.attempted, color: "#0d6efd" },
    { label: "Correct", value: results.correct, color: "#198754" },
    { label: "Wrong", value: results.wrong, color: "#dc3545" },
    { label: "Skipped", value: results.skipped, color: "#ffc107" },
    { label: "Final Score", value: `${results.score}`, color: "#000" }
  ];

  return (
    <div className="row g-3 mb-4">
      {items.map((item, i) => (
        <div key={i} className="col-md-4 col-lg-2">
          <div className="card h-100 border-0 shadow-sm p-3 text-center transition-hover">
            <small className="text-muted d-block mb-1 fw-bold">{item.label}</small>
            <h3 className="mb-0 fw-bold" style={{ color: item.color }}>{item.value}</h3>
          </div>
        </div>
      ))}
      <style>{`.transition-hover:hover { transform: translateY(-5px); transition: transform 0.3s ease; }`}</style>
    </div>
  );
};

export default ResultSummary;
