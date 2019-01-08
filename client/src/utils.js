import { WEATHER_API_ENDPOINT } from './constants';

// Weather icons
import ThunderStormIcon from './assets/weather_icons/thunder.svg';
import RainIcon from './assets/weather_icons/rainy-5.svg';
import SnowIcon from './assets/weather_icons/snowy.svg';
import ClearIcon from './assets/weather_icons/day.svg';
import CloudsIcon from './assets/weather_icons/cloudy.svg';
import FoggyIcon from './assets/weather_icons/foggy.svg';

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
      const resposeData = JSON.parse(xhr.response);
      if (xhr.status !== 200 || resposeData.data.cod !== 200) {
        return callback(resposeData);
      }

      return callback(null, resposeData);
    }
  };

  xhr.send(JSON.stringify(requestOptions.body));
}

export function weatherIcon(weatherId) {
  if (weatherId <= 232) {
    return ThunderStormIcon;
  } else if (weatherId >= 300 && weatherId <= 531) {
    return RainIcon;
  } else if (weatherId >= 600 && weatherId <= 622) {
    return SnowIcon;
  } else if (weatherId === 741 || weatherId === 701) {
    return FoggyIcon;
  } else if (weatherId === 800) {
    return ClearIcon;
  } else if (weatherId >= 801 && weatherId <= 804) {
    return CloudsIcon;
  }

  return ClearIcon;
}
