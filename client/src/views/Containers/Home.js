import React from 'react';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      locationData: '',
      locationType: 'name',
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
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

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleButtonClick();
    }
  }

  render() {
    return (
      <div>
        <p className='card__title'>Simply Weather</p>
        <p className='card__subtitle'>View the current weather for your area:</p>
        <div className='input'>
          <input
            type='text'
            name='city'
            onChange={this.handleInputFieldChange}
            onKeyPress={this._handleKeyPress}
            className='form__input'
          />
          <label htmlFor="city" className="form__label">City Name</label>
          <button className='button' onClick={this.handleButtonClick}>Check weather</button>
        </div>
      </div>
    );
  }
};
