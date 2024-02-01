import React, { useState } from 'react';
import Form from '../components/Form';
import '../css/form.css';
import '../css/styles.css';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate(); 
  const handleLogin = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
  
      const data = await response.json();
      console.log('Login response:', data);
  
      if (response.ok) {
        document.cookie = `token=${data.token}; path=/`;
        setLoginSuccess(true);
        setIsUserLoggedIn(true);
        navigate('/');
    
       
      } else {
        
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  /*const handleLogin = (userData) => {
    console.log('Login successful:', userData);
    setLoginSuccess(true);
  };*/

  const closeLoginPopup = () => {
    setLoginSuccess(false);
  };
  
  

  return (
    <div>
       <h2 className="header-title">LogIn</h2>
      <Form
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="custom-input" 
      />
      <Form
        label="Lozinka"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="custom-input" 
      />
      <div className="button-container">
      <Button label="Prijavi se" onClick={handleLogin}></Button>
    </div>
    
    {loginSuccess && (
  <div className="popup">
    <p>Uspešno ste se prijavili!</p>
    <Button label="Zatvori" onClick={closeLoginPopup} />
  </div>
)}
    </div>
    
  );
};

export default Login;


