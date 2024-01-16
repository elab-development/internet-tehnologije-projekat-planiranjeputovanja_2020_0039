import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../css/form.css';
import '../css/styles.css';



  /*const Register = () => {
    const handleRegistration = (userData) => {
      console.log('Registration successful:', userData);
      
    };*/
  
  
  //NE DIRATI KOMENTAR, TO JE BACKEND KOD
  

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
        console.log('Registration successful:', userData);
        // Dodajte logiku za preusmeravanje ili prikazivanje poruke o uspehu
      } else {
        console.error('Registration failed:', response.statusText);
        // Dodajte logiku za prikazivanje poruke o grešci
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Dodajte logiku za prikazivanje opšte poruke o grešci
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Register;


