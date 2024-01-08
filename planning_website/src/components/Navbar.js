import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import '../css/styles.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Planer putovanja</Link></li>
        <li onClick={toggleDropdown}>
        <span className="join-link">Pridruži se</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registracija</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/gallery">Galerija</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

