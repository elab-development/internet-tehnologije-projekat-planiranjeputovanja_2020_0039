import React, { useState, useEffect } from 'react';
import '../css/travelform.css';
import Button from '../components/Button';
import axios from 'axios';

const TravelForm = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAttraction, setSelectedAttraction] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [generatedText, setGeneratedText] = useState('');

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Update this to your Laravel backend URL
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await api.get('/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchCities = async (selectedCountry) => {
    try {
      const response = await api.get(`/api/cities/${selectedCountry}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchAttractions = async (selectedCity) => {
    try {
      const response = await api.get(`/api/attractions/${selectedCity}`);
      setAttractions(response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const handleCountryChange = async (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedCity('');
    setSelectedAttraction('');
    setSelectedDate('');

    await fetchCities(selectedCountry);
  };

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setSelectedAttraction('');
    setSelectedDate('');

    await fetchAttractions(selectedCity);
  };

  const handleAttractionChange = (event) => {
    const selectedAttraction = event.target.value;
    setSelectedAttraction(selectedAttraction);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const generateSummaryText = () => {
    return `
      Drago nam je što putujete sa nama. Ovo je plan Vašeg sledećeg putovanja.
      Država koju ste odabrali je: ${selectedCountry}
      Grad koji ćete upoznati: ${selectedCity || 'N/A'}
      Atrakcija koju želite posetiti: ${selectedAttraction || 'N/A'}
      Vaš polazak je: ${selectedDate || 'N/A'}
      Vidimo se! Hvala Vam na poverenju!
    `;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const summaryText = generateSummaryText();
    console.log('Form data:', { selectedCountry, selectedCity, selectedAttraction, selectedDate });
    console.log('Generated text:', summaryText);

    setGeneratedText(summaryText);
  };

  return (
    <div className="center-container">
      <form className="form-travel" onSubmit={handleSubmit}>
        <label className='travellabel' htmlFor="country">Država:</label>
        <select className='travelselect' id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="" disabled>Odaberi državu</option>
          {Array.isArray(countries) && countries.length > 0 && countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>

        {selectedCountry && (
          <div className="dynamic-dropdown">
            <label className='travellabel' htmlFor="city">Grad:</label>
            <select className='travelselect' id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="" disabled>Odaberi grad</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedCity && (
          <div className="attractions-container">
            <label className='travellabel' htmlFor="attraction">Izaberite atrakciju:</label>
            <select className='travelselect' id="attraction" value={selectedAttraction} onChange={handleAttractionChange}>
              <option value="">Izaberite atrakciju</option>
              {attractions.map((attraction) => (
                <option key={attraction.id} value={attraction.id}>
                  {attraction.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <label className='travellabel' htmlFor="date">Datum putovanja:</label>
        <input className='travelinput' type="date" id="date" value={selectedDate} onChange={handleDateChange} />

        <Button label="Pošalji" onClick={handleSubmit} />
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
