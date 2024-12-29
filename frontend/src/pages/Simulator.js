import React, { useState, useEffect } from 'react';
import ProcessForm from '../components/ProcessForm';
import GanttChart from '../components/GanttChart';
import MetricsDisplay from '../components/MetricsDisplay';
import { API_BASE_URL } from '../config';

const Simulator = () => {
  const [processes, setProcesses] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('fcfs');
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available algorithms
    fetch(`${API_BASE_URL}/algorithms`)
      .then(res => res.json())
      .then(data => setAlgorithms(data))
      .catch(err => setError('Failed to fetch algorithms'));
  }, []);

  const handleSimulate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          algorithm: selectedAlgorithm,
          processes: processes,
          time_quantum: timeQuantum,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
        setError(null);
      } else {
        setError(data.error || 'Simulation failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="simulator-container">
      <div className="controls-section">
        <div className="algorithm-selector">
          <label>
            Algorithm:
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
            >
              {algorithms.map(algo => (
                <option key={algo} value={algo}>
                  {algo.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          
          {selectedAlgorithm === 'round_robin' && (
            <div className="time-quantum">
              <label>
                Time Quantum:
                <input
                  type="number"
                  min="1"
                  value={timeQuantum}
                  onChange={(e) => setTimeQuantum(parseInt(e.target.value))}
                />
              </label>
            </div>
          )}
        </div>

        <ProcessForm
          processes={processes}
          setProcesses={setProcesses}
          selectedAlgorithm={selectedAlgorithm}
        />

        <button 
          className="simulate-button"
          onClick={handleSimulate}
          disabled={processes.length === 0}
        >
          Simulate
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {results && (
        <div className="results-section">
          <GanttChart timeline={results.timeline} />
          <MetricsDisplay metrics={results} />
        </div>
      )}
    </div>
  );
};

export default Simulator; 