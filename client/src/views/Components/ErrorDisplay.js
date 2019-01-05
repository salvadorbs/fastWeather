import React from 'react';
import LightningBolt from '../assets/lightning.svg';

const Home = () => {

  return (
    <div>
      <div className='header'>
        <h2>Weather Forecast</h2>
        <img src={LightningBolt} alt=''/>
      </div>
      <div className="instructions">
        <p>Inserisci una città</p>
      </div>
      <div className='cityInput'>
        <form method='POST' action='/search-location'>
          <input type='text' placeholder='Cerca...' name='name'/>
          <button>ENTER</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
