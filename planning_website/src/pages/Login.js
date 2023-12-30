import React, { useState } from 'react';
import Form from '../components/Form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (userData) => {
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
  };
  

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Prijavi se</button>
    </div>
  );
};

export default Login;


