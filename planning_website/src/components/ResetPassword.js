// ResetPassword.js
import '../css/ResetPassword.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const ResetPassword = () => {
  const [email, setEmail] = useState('');
  

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Ovde možete postaviti odgovarajuću logiku za korisnički interfejs
      } else {
        console.error('Nešto je pošlo po zlu.');
      }
    } catch (error) {
      console.error('Greška prilikom slanja zahteva:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button onClick={handleResetPassword}>Resetuj lozinku</button>
      </div>
    </div>
  );
};

export default ResetPassword;


