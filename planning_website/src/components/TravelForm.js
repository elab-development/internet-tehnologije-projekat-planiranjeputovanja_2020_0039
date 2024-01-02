import React, { useState } from 'react';
import '../css/travelform.css';

const TravelForm = () => {
  // State za državu i grad
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // State za atrakcije i datum
 
  const [selectedAttraction, setSelectedAttraction] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // State za generisani tekst
  const [generatedText, setGeneratedText] = useState('');

  // Lista država i gradova (prilagodite prema stvarnom scenariju)
  const countries = ['Italija', 'Turska'];
  const citiesByCountry = {
    'Italija': ['Rim', 'Milano'],
    'Turska': ['Istanbul', 'Ankara'],
  };

  // Funkcija za promenu države
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedCity(''); // Resetuj grad prilikom promene države
  };

  // Funkcija za promenu grada
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setSelectedAttraction('');
  };

  // Funkcija za promenu atrakcija
  const handleAttractionChange = (event) => {
    setSelectedAttraction(event.target.value);
  };

  const getAttractionsForCity = (city) => {
    const attractionsByCity = {
      'Istanbul': ['Hagia Sophia', 'Egipatska Pijaca'],
      'Ankara': ['Anitkabir', 'Ankara Dvorac'],
      'Rim': ['Colosseum', 'Trevi Fontana'],
      'Milano': ['Duomo di Milano', 'Teatro alla Scala'],
    };

    return attractionsByCity[city] || [];
};


  // Funkcija za promenu datuma
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const generateSummaryText = () => {
    return `
      Drago nam je što putujete sa nama. Ovo je plan Vašeg sledećeg putovanja.
      Država koju ste odabrali je : ${selectedCountry}
      dok je grad koji ćete upoznati ${selectedCity || 'N/A'}
      Najviše vremena želite da provedete u poseti ${selectedAttraction || 'N/A'}
      Vaš polazak je ${selectedDate || 'N/A'}
      Vidimo se! Hvala Vam na poverenju!
    `;
  };
  

  // Funkcija za slanje forme
  const handleSubmit = (e) => {
    e.preventDefault();

    const summaryText = generateSummaryText();

    // Implementirajte logiku za slanje forme
    console.log('Podaci forme:', { selectedCountry, selectedCity, selectedAttraction, selectedDate });
    console.log('Generisani tekst:', summaryText);

    setGeneratedText(summaryText);
};

  return (
    <div className="center-container">
    <form className="form-travel" onSubmit={handleSubmit}>
      <label className='travellabel' htmlFor="country">Država:</label>
      <select className='travelselect' id="country" value={selectedCountry} onChange={handleCountryChange}>
        <option value="" disabled>Odaberi državu</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      {selectedCountry && (
        <div className="dynamic-dropdown">
          <label className='travellabel' htmlFor="city">Grad:</label>
          <select className='travelselect' id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="" disabled>Odaberi grad</option>
            {citiesByCountry[selectedCountry].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

{selectedCity && (
        <div className="attractions-container">
          <label className='travellabel' htmlFor="attraction">Izaberite atrakciju:</label>
          <select className='travelselect' id="attraction" value={selectedAttraction} onChange={handleAttractionChange}>
            <option value="">Izaberite atrakciju</option>
            {getAttractionsForCity(selectedCity).map((attraction) => (
              <option key={attraction} value={attraction}>
                {attraction}
              </option>
            ))}
          </select>
        </div>
      )}




      <label className='travellabel' htmlFor="date">Datum putovanja:</label>
      <input className='travelinput' type="date" id="date" value={selectedDate} onChange={handleDateChange} />

      <button className='travelbutton' type="submit">Pošalji</button>
      {generatedText && (
        <div>
          <label className='travellabel' htmlFor="generatedText">Vaš plan putovanja</label>
          <textarea id="generatedText" rows="4" value={generatedText} readOnly />
        </div>
      )}
    </form>
    </div>
  );
};

export default TravelForm;
