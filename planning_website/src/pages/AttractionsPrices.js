
import React from 'react';
import AttractionsPrices  from '../components/AttractionsPrices';
import AttractionChart from '../components/AttractionsChart';
const Attractions = () => {
  return (
    <div>
     <h2 className="header-title">Cene ulaznica</h2>
      <AttractionsPrices />
      <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '50px' }}>
        <AttractionChart />
      </div>
    </div>
  );
};

export default Attractions;
