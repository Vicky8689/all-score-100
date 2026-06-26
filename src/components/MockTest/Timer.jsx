import React from 'react';
import { AccessTime } from '@mui/icons-material';

const Timer = ({ formatTime, timeLeft }) => {
  const isLowTime = timeLeft < 60; // Less than 1 minute

  return (
    <div className={`d-flex align-items-center p-3 rounded shadow-sm ${isLowTime ? 'bg-danger text-white' : 'bg-white text-dark'}`} style={{ border: '1px solid #dee2e6' }}>
      <AccessTime className="me-2" />
      <div>
        <small className="d-block text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Time Left</small>
        <h4 className="mb-0 fw-bold font-monospace">{formatTime()}</h4>
      </div>
    </div>
  );
};

export default Timer;
