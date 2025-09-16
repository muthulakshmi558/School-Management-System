import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Schools from './pages/Schools';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Subjects from './pages/Subjects';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;