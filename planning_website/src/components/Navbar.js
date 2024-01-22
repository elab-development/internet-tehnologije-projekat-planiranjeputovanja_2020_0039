import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import '../css/styles.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false); 
  const navigate = useNavigate(); 
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    setIsUserRegistered(true);
    const token = getCookie('token');
    if (token) {
      setIsUserLoggedIn(true);
      //setIsUserRegistered(true);
      console.log('User is registered:', isUserRegistered);
    }
  }, [isUserRegistered]);
  
  useEffect(() => {
    setRefreshComponent(prevState => !prevState);
  }, [isUserRegistered]);
 
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleLogout = () => {
    // Ukloni token iz kolačića
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    // Postavi stanje za odjavljivanje
    setIsUserLoggedIn(false);
    setIsUserRegistered(false); // Ovo možda zavisi od vaših zahteva
    navigate('/');
  };

  return (
    <nav>
    <ul>
      <li><Link to="/">Planer putovanja</Link></li>
      <li onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <span className="join-link">Pridruži se</span>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            {!isUserLoggedIn ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registracija</Link></li>
              </>
            ) : (
              <li onClick={handleLogout}>Logout</li>
            )}
          </ul>
        )}
      </li>
      { isUserRegistered && (
        <>
          <li><Link to="/attractions">Cene</Link></li>
        </>
      )}
      {isUserLoggedIn && isUserRegistered && (
        <>
          <li><Link to="/gallery">Galerija</Link></li>
          <li><Link to="/contact">Kontakt</Link></li>
        </>
      )}
     
    </ul>
  </nav>
  );
};
export default Navbar;

