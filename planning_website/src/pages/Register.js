import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
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
        console.log('Registration successful:', data);
        // Add logic for redirecting or showing a success message
      } else {
        console.error('Registration failed:', response.statusText);
        // Add logic for showing an error message
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Add logic for showing a general error message
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Register;

