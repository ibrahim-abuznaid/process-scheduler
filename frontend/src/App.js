import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Simulator from './pages/Simulator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Process Scheduling Simulator</h1>
        </header>
        <Routes>
          <Route path="/" element={<Simulator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 