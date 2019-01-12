import { WEATHER_API_ENDPOINT } from './constants';

// Weather icons
import ThunderStormIcon from './assets/weather_icons/thunder.svg';
import RainIcon from './assets/weather_icons/rainy-5.svg';
import SnowIcon from './assets/weather_icons/snowy.svg';
import CloudsIcon from './assets/weather_icons/cloudy.svg';
import FoggyIcon from './assets/weather_icons/foggy.svg';

import ClearDayIcon from './assets/weather_icons/day.svg';
import ClearNightIcon from './assets/weather_icons/night.svg';

import CloudsDayIcon from './assets/weather_icons/cloudy-day.svg';
import CloudsNightIcon from './assets/weather_icons/cloudy-night.svg';

export function weatherAppAPI(requestHeaders, requestBody, callback) {
  var xhr = new XMLHttpRequest();// eslint-disable-line no-undef
  const requestEndpoint = WEATHER_API_ENDPOINT;
  const requestOptions = {
    method: 'post',
  };

  if (requestBody) {
    requestOptions.body = requestBody;
  }

  if (requestHeaders) {
    requestOptions.headers = requestHeaders;
  }

  xhr.open(requestOptions.method, requestEndpoint, true);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 404) {
        return callback({ error: '404' });
      }

      const responseData = JSON.parse(xhr.response);
      if (xhr.status !== 200 || responseData.data.cod !== 200) {
        return callback(responseData);
      }

      return callback(null, responseData);
    }
  };

  xhr.send(JSON.stringify(requestOptions.body));
}

export function weatherIcon(weatherId, icon) {
  if (weatherId <= 232) {
    return ThunderStormIcon;
  } else if (weatherId >= 300 && weatherId <= 531) {
    return RainIcon;
  } else if (weatherId >= 600 && weatherId <= 622) {
    return SnowIcon;
  } else if (weatherId === 741 || weatherId === 701) {
    return FoggyIcon;
  } else if (weatherId === 800) {
    if (icon === '01n') {
      return ClearNightIcon;
    }
    return ClearDayIcon;
  } else if (weatherId === 801) {
    if (icon === '02n') {
      return CloudsNightIcon;
    }
    return CloudsDayIcon;
  } else if (weatherId >= 802 && weatherId <= 804) {
    return CloudsIcon;
  }

  return ClearDayIcon;
}

export function ConvertUnixDate(unix_timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = '0' + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
}
