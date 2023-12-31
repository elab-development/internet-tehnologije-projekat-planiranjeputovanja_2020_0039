import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../css/MyGallery.css';



const MyGallery = () => {
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
  const galleryImages = images.map(image => ({
    original: image.original,
    thumbnail: image.thumbnail,
    description: image.description,
  }));
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <ImageGallery items={galleryImages} />
        </Col>
      </Row>
  </Container>  
  );
};

export default MyGallery;
