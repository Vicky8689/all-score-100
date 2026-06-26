import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ResultCharts = ({ results }) => {
  const accuracyData = [
    { name: 'Correct', value: results.correct },
    { name: 'Wrong', value: results.wrong },
  ];

  const attemptData = [
    { name: 'Attempted', value: results.attempted },
    { name: 'Skipped', value: results.skipped },
  ];

  const COLORS = ['#198754', '#dc3545', '#0d6efd', '#ffc107'];

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6">
        <div className="card border-0 shadow-sm p-4 h-100">
          <h6 className="fw-bold mb-4">Accuracy Analysis</h6>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accuracyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {accuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-3">
             <h4 className="fw-bold text-primary mb-0">{results.accuracy}%</h4>
             <small className="text-muted fw-bold uppercase">Accuracy Score</small>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-0 shadow-sm p-4 h-100">
          <h6 className="fw-bold mb-4">Attempt Summary</h6>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attemptData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attemptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-3">
             <h4 className="fw-bold text-success mb-0">{results.percentage}%</h4>
             <small className="text-muted fw-bold uppercase">Total Percentage</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCharts;
