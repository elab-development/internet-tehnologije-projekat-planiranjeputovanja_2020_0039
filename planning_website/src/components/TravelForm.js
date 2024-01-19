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

  const [generatedText, setGeneratedText] = useState('');

  const [weather, setWeather] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Update this to your Laravel backend URL
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCityId) {
      console.log('Before Weather Fetch');
      // Fetch weather for the selected city
      fetchWeather(selectedCity);
      // Fetch attractions for the selected city
      fetchAttractions(selectedCityId);
      // Fetch hotels for the selected city
      fetchHotels(selectedCityId);
    }
  }, [selectedCityId]);
  

  const fetchWeather = async (cityName) => {
    const apiKey = 'xxx';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  
    console.log('City Name:', cityName);
  
    try {
      const response = await axios.get(apiUrl);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
    }
  };
  

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
      // Modifikujte gradove tako da sadrže objekte sa id i name
      const modifiedCities = response.data.map((city) => ({
        id: city.id,
        name: city.name,
      }));
      setCities(modifiedCities);
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
      setAttractions([]);
    }
  };

  const fetchHotels = async (cityId) => {
    try {
      const response = await api.get(`/api/hotels/${cityId}`);
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setHotels([]);
    }
  };

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value;
    setSelectedCountry(selectedCountryId);
    setSelectedCity('');
    setSelectedAttraction('');
    setSelectedHotel('');

    // Fetch cities based on the selected country
    await fetchCitiesByCountry(selectedCountryId);
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value;
    setSelectedCity(selectedCityName);
    setSelectedAttraction('');
    setSelectedHotel('');
  
    const selectedCityObject = cities.find(city => city.name === selectedCityName);
    const cityId = selectedCityObject ? selectedCityObject.id : null;
  
    setSelectedCityId(cityId);
  };
  

  

  const handleHotelChange = (event) => {
    const selectedHotelId = event.target.value;
    setSelectedHotel(selectedHotelId);
  };

  const handleAttractionChange = (event) => {
    const selectedAttractionId = event.target.value;
    setSelectedAttraction(selectedAttractionId);
  };

  const generateSummaryText = () => {
    let weatherText = '';

    if (weather && weather.main && weather.weather) {
      weatherText = `Trenutna temperatura: ${weather.main.temp}°C, Vreme: ${weather.weather[0].description}`;
    } else {
      weatherText = 'Nema dostupnih informacija o vremenu';
    }

    return `
      Drago nam je što putujete sa nama. Ovo je plan Vašeg sledećeg putovanja.
      Država koju ste odabrali je: ${selectedCountry}
      Grad koji ćete upoznati: ${selectedCity || 'N/A'}
      Atrakcija koju želite posetiti: ${selectedAttraction || 'N/A'}
      Hotel u kojem ćete boraviti: ${selectedHotel || 'N/A'}
      ${weatherText}
      Vidimo se! Hvala Vam na poverenju!
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const summaryText = generateSummaryText();
      console.log('Form data:', {
        selectedCountry,
        selectedCity,
        selectedAttraction,
        selectedHotel,
      });
      console.log('Generated text:', summaryText);

      // Set the generated text only if the request is successful
      setGeneratedText(summaryText);
    } catch (error) {
      console.error('Error generating travel summary:', error);
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
      <option key={city.id} value={city.name}>
        {city.name}
      </option>
    ))
  ) : (
    <option value="" disabled>Nema dostupnih gradova</option>
  )}
</select>

          </div>
        )}

        {selectedCity && (
          <>
            <div className="weather-container">
              <label className='travellabel'>Trenutno vreme:</label>
              {weather ? (
                <p>{`Temperatura: ${weather.main.temp}°C, Vreme: ${weather.weather[0].description}`}</p>
              ) : (
                <p>Nema dostupnih informacija o vremenu</p>
              )}
            </div>

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


  

