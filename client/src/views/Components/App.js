import React from 'react';

const App = ({ children }) => (
  <main>
    <div className='app'>
      <div className='card'>
        <header className='card__header'>
          <div className='card__icon'>
            <i className='icon'></i>
          </div>
        </header>
        <div className='card__content'>
          {children}
        </div>
      </div>
    </div>
  </main>
);

export default App;
