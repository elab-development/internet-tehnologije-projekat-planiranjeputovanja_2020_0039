import React, { useState } from 'react';
import Form from '../components/Form';
import '../css/form.css';
import '../css/styles.css';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);


  /*const handleLogin = async (userData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log('Login response:', data);
  
      // Handle any further actions based on the response if needed
    } catch (error) {
      console.error('Error during login:', error);
    }
  };*/

  const handleLogin = (userData) => {
    console.log('Login successful:', userData);
    setLoginSuccess(true);
  };

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
      />
      <Form
        label="Lozinka"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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


