import React from 'react';
import { Link } from 'react-router-dom';

import NoLocationFound from '../../assets/no-location.svg';

export default function CardError(props) {
  return (
    <div className='errorView'>
      <p className='card__title'>No location found!</p>
      <div>
        <img src={NoLocationFound} alt='no location found' />
      </div>
      <Link to='/'>
        <button className='button button--small reset'>Try Again</button>
      </Link>
    </div>
  );
}
