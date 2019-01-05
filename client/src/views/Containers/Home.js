import React from 'react';

import { LightningBolt } from '../assets/lightning.svg';
import { RadioButton } from '../Components/index';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      locationData: '',
      locationType: 'cityName',
    };

    this.handleRadioInputChange = this.handleRadioInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }

  handleRadioInputChange(event) {
    this.setState({
      locationType: event.target.value,
    });
  }

  handleInputFieldChange(event) {
    this.setState({
      locationData: event.target.value,
    });
  }

  handleButtonClick(event) {
    console.log(this.props);
    this.props.history.push({
      pathname: '/current-weather',
      state: this.state,
    });
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h2>Weather Forecast</h2>
          <img src={LightningBolt}/>
        </div>
        <div className="instructions">
          <p>Inserisci un luogo.</p>
        </div>
        <div className='cityInput'>
          <input
            type='text'
            placeholder='Inserisci...'
            name='city'
            onChange={this.handleInputFieldChange}
          />
          <button onClick={this.handleButtonClick}>ENTER</button>
        </div>
        <div className='radio-button-section'>
          <RadioButton
            value='name'
            isSelected={this.state.locationType === 'name'}
            onChange={this.handleRadioInputChange}
            radioButtonLabel='City name'
          />
        </div>
      </div>
    );
  }
};
