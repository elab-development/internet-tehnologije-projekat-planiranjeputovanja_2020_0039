import React from 'react';
import Gallery from 'react-image-gallery';
import '../css/styles.css';

const images = [
  {
    original: '/images/milan1.jpg',
    thumbnail: '/images/milan1.jpg',
    description: 'Milan 1',
  },
  {
    original: '/images/milan2.jpg.webp',
    thumbnail: '/images/milan2.jpg.webp',
    description: 'Milan 2',
  },
  {
    original: '/images/rim1.jpg',
    thumbnail: '/images/rim1.jpg',
    description: 'Rim 1',
  },
  {
    original: '/images/rim2.jpg',
    thumbnail: '/images/rim2.jpg',
    description: 'Rim 2',
  },
  // Dodajte slike prema potrebi
];

const MyGallery = () => {
  return (
    <div className="upper-container">
      <div className="gallery-container">
        <h2>Galerija Atrakcija</h2>
        <Gallery items={images} />
      </div>
    </div>
  );
};

export default MyGallery;
