// src/components/LoadingSpinner.js

import React from 'react';

const LoadingSpinner = () => (
  <div className="spinner">
    <div className="spin"></div>
    <style>
      {`
        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .spin {
          border: 4px solid #f3f3f3; /* Light gray */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default LoadingSpinner;