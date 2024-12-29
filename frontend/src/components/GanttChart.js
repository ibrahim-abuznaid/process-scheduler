import React from 'react';

const GanttChart = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  const totalTime = Math.max(...timeline.map(t => t.end));
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
  ];

  return (
    <div className="gantt-chart">
      <h3>Gantt Chart</h3>
      <div className="chart-container">
        <div className="timeline">
          {timeline.map((slot, index) => (
            <div
              key={index}
              className="process-slot"
              style={{
                width: `${((slot.end - slot.start) / totalTime) * 100}%`,
                backgroundColor: colors[slot.pid % colors.length],
              }}
            >
              <div className="process-label">P{slot.pid}</div>
              <div className="time-label">
                {slot.start}-{slot.end}
              </div>
            </div>
          ))}
        </div>
        <div className="time-axis">
          {Array.from({ length: totalTime + 1 }, (_, i) => (
            <div key={i} className="time-marker">{i}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart; 