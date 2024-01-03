
import React, { useState } from 'react';
import Form from './Form';
import '../css/form.css';
import Button from '../components/Button';

const RegisterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = () => {
    setRegistrationSuccess(true);
    if (onSubmit) {
      onSubmit({ name, email, password });
    }
  };


  //OVO JE BACKEND KOD, NE DIRATI!!!

  /*const handleRegistration = async (userData) => {
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
        setRegistrationSuccess(true);
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
  };*/

  const closePopup = () => {
    setRegistrationSuccess(false);
  };
  

  return (
    <div>
       <h2 className="header-title">Register</h2>
      <Form label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Form label="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Form
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(String(e.target.value))}
      />
      <div className="button-container">
     <Button label="Registruj se" onClick={() => handleRegistration({ name, email, password })}></Button>
</div>
{registrationSuccess && (
        <div className="popup">
          <p>Uspešno ste se registrovali, {name}!</p>
          <Button label="Zatvori" onClick={closePopup}/>
          </div>
      )}
    </div>
  );
};

export default RegisterForm;
