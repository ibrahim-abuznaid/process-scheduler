import React, { useState } from 'react';

const ProcessForm = ({ processes, setProcesses, selectedAlgorithm }) => {
  const [newProcess, setNewProcess] = useState({
    arrival_time: 0,
    burst_time: 1,
    priority: 1,
  });

  const handleAddProcess = () => {
    setProcesses([
      ...processes,
      {
        ...newProcess,
        pid: processes.length + 1,
      },
    ]);
    setNewProcess({
      arrival_time: 0,
      burst_time: 1,
      priority: 1,
    });
  };

  const handleRemoveProcess = (pid) => {
    setProcesses(processes.filter(p => p.pid !== pid));
  };

  return (
    <div className="process-form">
      <div className="process-inputs">
        <label>
          Arrival Time:
          <input
            type="number"
            min="0"
            value={newProcess.arrival_time}
            onChange={(e) => setNewProcess({
              ...newProcess,
              arrival_time: parseInt(e.target.value)
            })}
          />
        </label>

        <label>
          Burst Time:
          <input
            type="number"
            min="1"
            value={newProcess.burst_time}
            onChange={(e) => setNewProcess({
              ...newProcess,
              burst_time: parseInt(e.target.value)
            })}
          />
        </label>

        {selectedAlgorithm === 'priority' && (
          <label>
            Priority:
            <input
              type="number"
              min="1"
              value={newProcess.priority}
              onChange={(e) => setNewProcess({
                ...newProcess,
                priority: parseInt(e.target.value)
              })}
            />
          </label>
        )}

        <button onClick={handleAddProcess}>Add Process</button>
      </div>

      <div className="process-list">
        <h3>Processes</h3>
        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              {selectedAlgorithm === 'priority' && <th>Priority</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.pid}>
                <td>{process.pid}</td>
                <td>{process.arrival_time}</td>
                <td>{process.burst_time}</td>
                {selectedAlgorithm === 'priority' && <td>{process.priority}</td>}
                <td>
                  <button onClick={() => handleRemoveProcess(process.pid)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessForm; 