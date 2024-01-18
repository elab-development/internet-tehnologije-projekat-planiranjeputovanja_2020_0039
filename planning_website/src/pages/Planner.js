
import React from 'react';
import TravelForm from '../components/TravelForm';
import '../css/form.css';
import '../css/styles.css';
//import GoogleMaps from '../components/GoogleMaps';

const Planner = () => {
  return (
    <div>
       <h2 className="header-title">Planer putovanja</h2>
       <TravelForm/>
    </div>
  );
};

export default Planner;
