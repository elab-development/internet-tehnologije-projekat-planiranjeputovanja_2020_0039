//eslint-disable-next-line
import React, { useState } from 'react';
import Form from './Form';

const RegisterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (userData) => {
    try {

      console.log('UserData:', userData);

      const formData = new URLSearchParams();
  
      for (const [key, value] of Object.entries(userData)) {
        formData.append(key, value);
      }
  
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Registration successful:', data);
        // Add logic for redirecting or showing a success message
      } else {
        console.error('Registration failed:', data);
  
        // Display validation errors to the user
        if (data && typeof data === 'object' && data.errors) {
          for (const [field, errors] of Object.entries(data.errors)) {
            const errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
            console.error(`Validation error for ${field}:`, errorMessage);
          }
        } else {
          console.error('Unexpected response format:', data);
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <Form label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Form label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Form
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(String(e.target.value))}
      />
     <button onClick={() => handleRegistration({ name, email, password })}>Register</button>

    </div>
  );
};

export default RegisterForm;
