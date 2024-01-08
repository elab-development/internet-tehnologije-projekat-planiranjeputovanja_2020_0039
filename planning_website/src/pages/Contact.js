import React from 'react';
import ContactForm from '../components/ContactForm'; // Putanja do ContactForm komponente

const ContactPage = () => {
  return (
    <div className="container">
  <div className="content">
    <div className="contact-container">
      <h1 className="contact-title">Kontaktirajte nas</h1>
      <ContactForm />
      {/* Dodaj formu za kontakt ili ostali kontakt sadržaj ovdje */}
    </div>
  </div>
</div>
   
  );
};

export default ContactPage;
