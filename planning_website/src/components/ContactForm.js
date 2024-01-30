import React, { useState } from 'react';
import '../css/ContactForm.css'; // Stilizacija

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Podaci su uspešno poslati!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        console.error('Greška prilikom slanja podataka na server.');
      }
    } catch (error) {
      console.error('Greška prilikom slanja zahteva:', error);
    }
  };
  const handlePopupClose = () => {
    setIsSuccess(false);
  };

  return (
    <>
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Ime"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Poruka"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Pošalji</button>
    </form>

    {isSuccess && (
        <div className="success-popup">
          <p>Uspešno ste poslali poruku!</p>
          <button onClick={handlePopupClose}>Zatvori</button>
        </div>
      )}
    </>
  );
};

export default ContactForm;
