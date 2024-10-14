import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import Registro from './components/Registro';
import { Home } from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
