import React from 'react';

import LoadingIcon from '../../assets/loading.svg';

export default function Loader(props) {
  return (
    <div className='loadingView'>
      <p className='card__title'>Loading...</p>
      <img className='loadingIcon' src={LoadingIcon} alt='loading icon' />
    </div>
  );
}
