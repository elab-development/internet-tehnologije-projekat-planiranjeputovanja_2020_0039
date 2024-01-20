
import React from 'react';
import '../css/AttractionsPrices.css'; // Stvorićemo ovaj CSS fajl kasnije
const attractionsData = [
    { name: 'Duomo di Milano', price: 'Besplatno', imageName: 'Milan1.jpg' },
    { name: 'Colosseum', price: '27,90e', imageName: 'Rim1.jpg' },
    {name: 'Vatikan', price: '30e', imageName: 'Vatikan.jpg'},
    {name: 'Sagrada Familia', price: '32e', imageName: 'SagradaFamilia.jpg'},
    {name: 'Guell park', price: '15e', imageName: 'Guell.jpg'},
    {name: 'Fontana Di Trevi', price: 'Besplatno', imageName: 'DiTrevi.jpg'},
    {name: 'Galleria Vittorio Emanuele II', price: 'Besplatno', imageName: 'Milano.jpg'},
    {name: 'Rome Forum', price: 'Besplatno', imageName: 'Rim2.jpg'},
    {name: 'Ponte di Rialto', price: 'Besplatno', imageName: 'Venecija.jpg'}
    
  ];
  
  const AttractionsPrices = () => {
    return (
      <div className="attractions-container">
        {attractionsData.map((attraction, index) => (
          <div key={index} className="attraction-item">
            <img src={`/images/${attraction.imageName}`} alt={attraction.name} />
            <p>{attraction.name}</p>
            <p>{attraction.price}</p>
          </div>
        ))}
      </div>
    );
  };
  

export default AttractionsPrices;
