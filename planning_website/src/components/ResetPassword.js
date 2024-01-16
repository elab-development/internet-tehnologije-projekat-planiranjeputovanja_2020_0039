// ResetPassword.js
import '../css/ResetPassword.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('/api/reset-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Greška pri slanju e-pošte za resetovanje lozinke:', error.response.data.error);
            setMessage('Došlo je do greške. Proverite e-poštu i pokušajte ponovo.');
        }
    };

    return (
        <div className="center-container">
          <div>
            <h2>Zaboravljena lozinka</h2>
            <label>E-pošta:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleResetPassword}>Posalji e-poštu za resetovanje lozinke</button>
            {message && <p>{message}</p>}
            
            <div className="reset-password-link">
              <Link to="/login">Povratak na prijavu</Link>
            </div>
          </div>
        </div>
      );
};

export default ResetPassword;
