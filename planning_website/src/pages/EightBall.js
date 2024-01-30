
import React from 'react';
import EightBall from '../components/EightBall';
import '../css/EightBall.css';


function Ball() {
    return (
      <div>
         <h2 className="header-title">Magična lopta</h2>
        <EightBall />
      </div>
    );
  }
  
  export default Ball;