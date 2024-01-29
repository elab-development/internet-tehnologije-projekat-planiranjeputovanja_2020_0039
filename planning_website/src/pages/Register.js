import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import '../css/form.css';
import '../css/styles.css';
import { Link, useNavigate } from 'react-router-dom';


  /*const Register = () => {
    const handleRegistration = (userData) => {
      console.log('Registration successful:', userData);
      
    };*/
  
  
  //NE DIRATI KOMENTAR, TO JE BACKEND KOD
  

const Register = () => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const navigate = useNavigate(); 
  const handleRegistration = async (userData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
       
        const data = await response.json();
       // navigate('/attractions'); 
        document.cookie = `token=${data.token}; path=/`;

        setIsUserRegistered(true);
        console.log('isUserRegistered:', isUserRegistered);
        console.log('Registration successful:', userData);
       
      } else {
        console.error('Registration failed:', response.statusText);
        
      }
    } catch (error) {
      console.error('Error during registration:', error);
      
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Register;


