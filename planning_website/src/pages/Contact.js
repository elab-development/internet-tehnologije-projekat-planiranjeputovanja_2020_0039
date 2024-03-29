import React from 'react';
import ContactForm from '../components/ContactForm'; // Putanja do ContactForm komponente
import FileUploader from '../components/FileUploader';
const ContactPage = () => {
  const handleUpload = (files) => {
    // Ovde možete implementirati logiku za slanje slika na server
    console.log('Primljene slike:', files);
    alert('Fajl je uspešno primljen!');
  };

  return (
    <div className="container">
  <div className="content">
    <div className="contact-container">
      <h1 className="contact-title">Kontaktirajte nas</h1>
      <ContactForm />
      <h1 className="contact-title">Vaše avanture</h1>
      <FileUploader onUpload={handleUpload} />
    
      {}
    </div>
  </div>
</div>
   
  );
};

export default ContactPage;
