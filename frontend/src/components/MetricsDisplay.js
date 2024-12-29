import React from 'react';

const MetricsDisplay = ({ metrics }) => {
  return (
    <div className="metrics-display">
      <h3>Performance Metrics</h3>
      <div className="metrics-grid">
        <div className="metric-item">
          <label>Average Waiting Time:</label>
          <span>{metrics.avg_waiting_time.toFixed(2)}</span>
        </div>
        <div className="metric-item">
          <label>Average Turnaround Time:</label>
          <span>{metrics.avg_turnaround_time.toFixed(2)}</span>
        </div>
        <div className="metric-item">
          <label>Average Response Time:</label>
          <span>{metrics.avg_response_time.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay; 