
import { Container, Row, Col, Image } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../css/MyGallery.css';
import React, { useState } from 'react';



const MyGallery = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [importedImages, setImportedImages] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // Učitavanje uvezene slike i dodavanje u niz
        setImportedImages([...importedImages, event.target.result]);
      };

      // Čitanje sadržaja slike kao URL
      reader.readAsDataURL(file);
    }
  };



  const images = [
    {
      original: '/images/milan1.jpg',
      thumbnail: '/images/milan1.jpg',
      description: 'Duomo di Milano',
    },
    {
      original: '/images/milano4.jpg',
      thumbnail: '/images/milano4.jpg',
      description: 'Milan',
    },
    {
      original: '/images/rim1.jpg',
      thumbnail: '/images/rim1.jpg',
      description: 'Colosseum',
    },
    {
      original: '/images/rim2.jpg',
      thumbnail: '/images/rim2.jpg',
      description: 'Roman Forum',
    },
    {
      original: '/images/Turska1.jpg',
      thumbnail: '/images/Turska1.jpg',
      description: 'Turkey',

    },
    {
      original: '/images/Turska2.jpg',
      thumbnail: '/images/Turska2.jpg',
      description: 'Turkey',
    },{
      original: '/images/Turska3.jpg',
      thumbnail: '/images/Turska3.jpg',
      description: 'Turkey',
    }
  ];
  const galleryImages = images.concat(
    importedImages.map((image, index) => ({
      original: image,
      thumbnail: image,
      description: `Imported Image ${index + 1}`,
    }))
  );

  const downloadImage = (url) => {
    // Kreirajte privremeni <a> element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded_image.jpg'; // Naziv fajla koji će biti preuzet

    // Dodajte element na stranicu
    document.body.appendChild(link);

    // Simulirajte klik na element
    link.click();

    // Uklonite element nakon simuliranog klika
    document.body.removeChild(link);
  };


  return (
    <Container>
      <Row>
      <Col xs={12}>
          <h1></h1>
          <ImageGallery items={galleryImages} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <div>
              <h2>Selected Image:</h2>
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
            </div>
          )}
         <button onClick={() => selectedImage !== undefined && downloadImage(galleryImages[selectedImage]?.original)}>
  Preuzmi trenutnu sliku
</button>
        </Col>
      </Row>
  </Container>  
  );
};

export default MyGallery;
