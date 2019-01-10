import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { weatherAppAPI } from '../../utils';
import { weatherIcon } from '../../utils';
import { ConvertUnixDate } from '../../utils';
import { CardError, Loading } from '../Components/index';

class CurrentWeather extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      isLoading: true,
      currentTemp: '',
      humidity: '',
      wind: '',
      windDirection: '',
      currentCondition: '',
      currentConditionDescription: '',
      weatherID: '',
      weatherIcon: '',
      cityName: '',
      cityNotFound: '',
      country: '',
      temp_min: '',
      temp_max: '',
      dt: '',
      pressure: '',
      icon: '',
    });

    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  handleApiResponse(ApiErrorResponse, ApiResponseData) {
    if (ApiErrorResponse) {
      this.setState({
        isLoading: false,
        cityNotFound: 404,
      });

      return;
    }

    this.setState({
      isLoading: false,
      currentTemp: Math.round(ApiResponseData.data.main.temp - 273.15),
      humidity: ApiResponseData.data.main.humidity,
      wind: Math.round(ApiResponseData.data.wind.speed),
      windDirection: ApiResponseData.data.wind.deg,
      currentCondition: ApiResponseData.data.weather[0].main,
      currentConditionDescription: ApiResponseData.data.weather[0].description,
      weatherId: ApiResponseData.data.weather[0].id,
      cityName: ApiResponseData.data.name,
      country: ApiResponseData.data.sys.country,
      temp_min: Math.round(ApiResponseData.data.main.temp_min - 273.15),
      temp_max: Math.round(ApiResponseData.data.main.temp_max - 273.15),
      dt: ConvertUnixDate(ApiResponseData.data.dt),
      pressure: ApiResponseData.data.main.pressure,
      icon: ApiResponseData.data.weather[0].icon,
    });
  }

  componentDidMount() {
    const weatherSearchData = this.props.location.state;
    const handleApiResponse = this.handleApiResponse;

    weatherAppAPI({}, weatherSearchData, function(err, data) {
      if (err) {
        handleApiResponse(err);
      } else {
        handleApiResponse(null, data);
      }
    });
  }

  render() {
    const Card = (
      <div id="outputView">
        <p id="currently" className="card__title">{this.state.cityName}, {this.state.country}</p>
        <p id="location" className="card__subtitle">{this.state.currentConditionDescription}</p>

        <img src={weatherIcon(this.state.weatherId, this.state.weatherIcon)} alt='Weather icon' />

        <ul id="weather" className="weather-details">
          <li className="weather-details__item">
            <span className="weather-details__label">Humidity</span>
            <span className="weather-details__value"><span id="humidity">{this.state.humidity}%</span></span>
          </li>
          <li className="weather-details__item">
            <span className="weather-details__label">Temp</span>
            <span className="weather-details__value"><span id="temp">{this.state.currentTemp}°</span></span>
          </li>
          <li className="weather-details__item">
            <span className="weather-details__label">Wind</span>
            <span className="weather-details__value"><span id="wind">{this.state.wind}</span><small>MPH</small></span>
          </li>
          <li className="weather-details__item">
            <span className="weather-details__label">Min Temp</span>
            <span className="weather-details__value"><span id="humidity">{this.state.temp_min}°</span></span>
          </li>
          <li className="weather-details__item">
            <span className="weather-details__label">Max Temp</span>
            <span className="weather-details__value"><span id="humidity">{this.state.temp_max}°</span></span>
          </li>
        </ul>

        <Link to='/'>
          <button className='button button--small reset'>Check Another Location</button>
        </Link>
      </div>
    );

    const WeatherConditions = (
      this.state.cityNotFound === 404 ? <div> <CardError /> </div> : <div> {Card} </div>
    );

    const CurrentWeatherCard = (
      this.state.isLoading === true ? <Loading /> : <div> {WeatherConditions} </div>
    );

    return (
      <div>
        {CurrentWeatherCard}
      </div>
    );
  }
}

export default CurrentWeather;
