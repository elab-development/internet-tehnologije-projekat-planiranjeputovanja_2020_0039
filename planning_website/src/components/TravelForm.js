import React, { useState, useEffect } from 'react';
import '../css/travelform.css';
import Button from '../components/Button';
import axios from 'axios';

const TravelForm = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAttraction, setSelectedAttraction] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  
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

  const fetchCitiesByCountry = async (countryId) => {
    try {
      const response = await api.get(`/api/cities/${countryId}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchAttractions = async (cityId) => {
    try {
      const response = await api.get(`/api/attractions/${cityId}`);
      setAttractions(response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const fetchHotels = async (cityId) => {
    try {
      const response = await api.get(`/api/hotels/${cityId}`);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value;
    setSelectedCountry(selectedCountryId);
    setSelectedCity('');
    setSelectedAttraction('');
    setSelectedStartDate('');
    setSelectedEndDate('');

    // Fetch cities based on the selected country
    await fetchCitiesByCountry(selectedCountryId);
  };

  const handleCityChange = async (e) => {
    const selectedCityId = e.target.value;
    setSelectedCity(selectedCityId);
    setSelectedAttraction('');

    // Fetch attractions based on the selected city
    await fetchAttractions(selectedCityId);
    await fetchHotels(selectedCityId);
  };

  const handleHotelChange = (event) => {
    const selectedHotel = event.target.value;
    setSelectedHotel(selectedHotel);
  };

  const handleAttractionChange = (event) => {
    const selectedAttraction = event.target.value;
    setSelectedAttraction(selectedAttraction);
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setSelectedStartDate(startDate);
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    setSelectedEndDate(endDate);
  };

  const generateSummaryText = () => {
    return `
      Drago nam je što putujete sa nama. Ovo je plan Vašeg sledećeg putovanja.
      Država koju ste odabrali je: ${selectedCountry}
      Grad koji ćete upoznati: ${selectedCity || 'N/A'}
      Atrakcija koju želite posetiti: ${selectedAttraction || 'N/A'}
      Početak putovanja: ${selectedStartDate || 'N/A'}
      Kraj putovanja: ${selectedEndDate || 'N/A'}
      Vidimo se! Hvala Vam na poverenju!
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format start and end dates as "yyyy/mm/dd"
      const formattedStartDate = selectedStartDate ? new Date(selectedStartDate).toISOString().split('T')[0] : null;
      const formattedEndDate = selectedEndDate ? new Date(selectedEndDate).toISOString().split('T')[0] : null;
      
      const response = await api.post('/api/travel-terms', {
        id_drzave: selectedCountry,
        id_grada: selectedCity,
        pocetak_putovanja: formattedStartDate !== '' ? formattedStartDate : null,
        kraj_putovanja: formattedEndDate !== '' ? formattedEndDate : null,
      });
  

      const summaryText = generateSummaryText();
      console.log('Form data:', {
        selectedCountry,
        selectedCity,
        selectedAttraction,
        selectedStartDate,
        selectedEndDate,
      });
      console.log('Generated text:', summaryText);

      setGeneratedText(summaryText);
      console.log(response.data); // Očekujemo poruku od servera
    } catch (error) {
      console.error('Error saving travel data:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
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
              {Array.isArray(cities) && cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))
              ) : (
                <option value="" disabled>Nema dostupnih gradova</option>
              )}
            </select>
          </div>
        )}

        {selectedCity && (
          <>
            <div className="attractions-container">
              <label className='travellabel' htmlFor="attraction">Izaberite atrakciju:</label>
              <select className='travelselect' id="attraction" value={selectedAttraction} onChange={handleAttractionChange}>
                <option value="">Izaberite atrakciju</option>
                {Array.isArray(attractions) && attractions.length > 0 ? (
                  attractions.map((attraction) => (
                    <option key={attraction.id} value={attraction.id}>
                      {attraction.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Nema dostupnih atrakcija</option>
                )}
              </select>
            </div>

            <div className="dates-container">
              <label className='travellabel' htmlFor="start-date">Početak putovanja:</label>
              <input className='travelinput' type="date" id="start-date" value={selectedStartDate} onChange={handleStartDateChange} />

              <label className='travellabel' htmlFor="end-date">Kraj putovanja:</label>
              <input className='travelinput' type="date" id="end-date" value={selectedEndDate} onChange={handleEndDateChange} />
            </div>

            <div className="hotels-container">
              <label className='travellabel' htmlFor="hotel">Izaberite hotel:</label>
              <select className='travelselect' id="hotel" value={selectedHotel} onChange={handleHotelChange}>
                <option value="">Izaberite hotel</option>
                {Array.isArray(hotels) && hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Nema dostupnih hotela</option>
                )}
              </select>
            </div>
          </>
        )}

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
