
import React, { useState } from 'react';
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
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const attractionsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
  
    const allAttractions = attractionsData;
  
    const indexOfLastAttraction = currentPage * attractionsPerPage;
    const indexOfFirstAttraction = indexOfLastAttraction - attractionsPerPage;
    const currentAttractions = (filteredAttractions.length > 0 ? filteredAttractions : allAttractions).slice(indexOfFirstAttraction, indexOfLastAttraction);
  
    const totalPages = Math.ceil((filteredAttractions.length > 0 ? filteredAttractions.length : allAttractions.length) / attractionsPerPage);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handleFilter = () => {
      const filtered = allAttractions.filter(attraction => {
        const attractionPrice = parseFloat(attraction.price.replace('e', '').replace(',', '.'));
        const min = minPrice !== '' ? parseFloat(minPrice) : Number.MIN_SAFE_INTEGER;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER;
        return attractionPrice >= min && attractionPrice <= max;
      });
      setFilteredAttractions(filtered);
      setCurrentPage(1);
    };
  
    const handleClearFilter = () => {
      setMinPrice('');
      setMaxPrice('');
      setFilteredAttractions([]);
      setCurrentPage(1);
    };
  
    return (
      <div className="attractions-container">
        <div className="filter-container">
          <label>Min cena:</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <label>Max cena:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <button onClick={handleFilter}>Filtriraj</button>
          <button onClick={handleClearFilter}>Očisti filter</button>
        </div>
        {currentAttractions.map((attraction, index) => (
          <div key={index} className="attraction-item">
            <img src={`/images/${attraction.imageName}`} alt={attraction.name} />
            <p>{attraction.name}</p>
            <p>{attraction.price}</p>
          </div>
        ))}
        <div className="pagination">
          <button onClick={handlePrevPage}>{'<'}</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage}>{'>'}</button>
        </div>
      </div>
    );
  };
  
  export default AttractionsPrices;