import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const AttractionChart = () => {
  const [attractionsData, setAttractionsData] = useState([]);

  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/api/attractions')
      .then(response => {
        const data = [['Atrakcija', 'Cena']];

       
        response.data.forEach(attraction => {
          data.push([attraction.name, parseFloat(attraction.price.replace('e', '').replace(',', '.'))]);
        });

        setAttractionsData(data);
      })
      .catch(error => {
        console.error('Error fetching attractions data:', error.response?.data || error.message);
      });
  }, []);

  return (
    <div>
      <h2>Vizualizacija Atrakcija prema cenama</h2>
      <Chart
        chartType="BarChart"
        data={attractionsData}
        options={{
          title: 'Cene Atrakcija',
          hAxis: { title: 'Atrakcija', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 0 },
          
        }}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default AttractionChart;
