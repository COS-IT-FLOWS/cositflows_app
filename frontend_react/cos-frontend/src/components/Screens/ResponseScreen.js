import React, { useState } from 'react';
import { start } from '@codetanzania/emis-stakeholder';

const StartButton = () => {
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    start(error => {
      if (error) {
        setError(error);
      } else {
        setStarted(true);
      }
    });
  };

  return (
    <div>
      <button onClick={handleStart} disabled={started}>
        {started ? 'Started' : 'Start'}
      </button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
};

export default StartButton;