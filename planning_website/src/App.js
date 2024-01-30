import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import './css/form.css';
import './css/navbar.css';
import './css/styles.css';
import Register from './pages/Register'
import Planner from './pages/Planner';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact'; 
import ResetPassword from './components/ResetPassword';
import Attractions from './pages/AttractionsPrices';
import Admin from './pages/Admin';
import Ball from './pages/EightBall';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Planner />} /> 
        <Route path="/admin" element={<Admin />} />       
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/attractions" element={<Attractions/>} />
        <Route path="/eightBall" element={<Ball/>} />
      </Routes>
    </Router>
  );
};

export default App;


