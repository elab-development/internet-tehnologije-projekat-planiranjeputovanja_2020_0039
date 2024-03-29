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
    const token = getCookie('token');
    setIsUserRegistered(true);
    if (token) {
      console.log("isUserRegistered before set:", isUserRegistered);
      setIsUserRegistered(true);
      console.log("isUserRegistered after set:", isUserRegistered);
      setIsUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    console.log("isUserRegistered after set:", isUserRegistered);
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
    
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
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
          <li><Link to="/gallery">Galerija</Link></li>
          <li><Link to="/eightBall">Magična lopta</Link></li>
          <li><Link to="/contact">Kontakt</Link></li>
        </>
      )}
      {isUserLoggedIn && isUserRegistered && (
        <>
          <li><Link to="/admin">Admin</Link></li>

        </>
      )}
     
    </ul>
  </nav>
  );
};
export default Navbar;

