import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import './css/form.css';
import './css/navbar.css';
import './css/styles.css';
import RegisterForm from './components/RegisterForm'
import Planner from './pages/Planner';
import Gallery from './pages/Gallery';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Planner />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/gallery" element={<Gallery />} />
        {/* Dodajte rute za ostale stranice */}
      </Routes>
    </Router>
  );
};

export default App;


