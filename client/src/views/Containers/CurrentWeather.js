import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { weatherAppAPI } from '../../utils';

// Assets
import ThunderStormIcon from '../assets/weather_icons/thunder.svg';
import RainIcon from '../assets/weather_icons/rainy-5.svg';
import SnowIcon from '../assets/weather_icons/snowy.svg';
import ClearIcon from '../assets/weather_icons/day.svg';
import CloudsIcon from '../assets/weather_icons/cloudy.svg';
import FoggyIcon from '../assets/weather_icons/foggy.svg';

import NoLocationFound from '../assets/no-location.svg';
import LoadingIcon from '../assets/loading.svg';

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
      weatherIcon: ClearIcon,
      cityName: '',
      cityNotFound: '',
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

    let weatherId = ApiResponseData.data.weather[0].id;

    if (weatherId <= 232) {
      this.setState({ weatherIcon: ThunderStormIcon });
    } else if (weatherId >= 300 && weatherId <= 531) {
      this.setState({ weatherIcon: RainIcon });
    } else if (weatherId >= 600 && weatherId <= 622) {
      this.setState({ weatherIcon: SnowIcon });
    } else if (weatherId === 741 || weatherId === 701) {
      this.setState({ weatherIcon: FoggyIcon});
    } else if (weatherId === 800) {
      this.setState({ weatherIcon: ClearIcon });
    } else if (weatherId >= 801 && weatherId <= 804) {
      this.setState({ weatherIcon: CloudsIcon });
    }

    this.setState({
      isLoading: false,
      currentTemp: Math.round(ApiResponseData.data.main.temp - 273.15) + '°',
      humidity: ApiResponseData.data.main.humidity + '%',
      wind: Math.round(ApiResponseData.data.wind.speed),
      windDirection: ApiResponseData.data.wind.deg,
      currentCondition: ApiResponseData.data.weather[0].main,
      currentConditionDescription: ApiResponseData.data.weather[0].description,
      cityName: ApiResponseData.data.name,
    });
  }

  componentDidMount() {
    const weatherSearchData = this.props.location.state;
    const handleApiResponse = this.handleApiResponse;

    weatherAppAPI({}, weatherSearchData, function (err, data) {
      if (err) {
        handleApiResponse(err);
      } else {
        handleApiResponse(null, data);
      }
    });
  }

  render() {
    const WeatherCardError = (
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

    const WeatherConditions = (
      this.state.cityNotFound === 404 ? <div> {WeatherCardError} </div> :
        <div id="outputView">
          <p id="currently" className="card__title">{this.state.currentCondition}</p>
          <p id="location" className="card__subtitle">in {this.state.cityName}</p>

          <img src={this.state.weatherIcon} alt='Weather icon' />

          <ul id="weather" className="weather-details">
            <li className="weather-details__item">
              <span className="weather-details__label">Humidity</span>
              <span className="weather-details__value"><span id="humidity">{this.state.humidity}</span></span>
            </li>
            <li className="weather-details__item">
              <span className="weather-details__label">Temperature</span>
              <span className="weather-details__value"><span id="temp">{this.state.currentTemp}</span></span>
            </li>
            <li className="weather-details__item">
              <span className="weather-details__label">Wind</span>
              <span className="weather-details__value"><span id="wind">{this.state.wind}</span><small>MPH</small></span>
            </li>
          </ul>

          <Link to='/'>
            <button className='button button--small reset'>Check Another Location</button>
          </Link>
        </div>
    );

    const LoadingDisplay = (
      <div className='loadingView'>
        <p className='card__title'>Loading...</p>
        <img className='loadingIcon' src={LoadingIcon} alt='loading icon' />
      </div>
    );

    const CurrentWeatherCard = (
      this.state.isLoading === true ? <div> {LoadingDisplay} </div> : <div> {WeatherConditions} </div>
    );

    return (
      <div>
        {CurrentWeatherCard}
      </div>
    );
  }
}

export default CurrentWeather;
