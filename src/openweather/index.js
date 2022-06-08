import axios from 'axios';

export const getCoordsCity = async (city) => {
  const response = await axios.get(`https://graphhopper.com/api/1/geocode?q=${city}&key=${process.env.REACT_APP_GRAPHHOPPER_API_KEY}`);
  const data = response.data.hits[0].point;

  return data;
}

export const getWeather = async (lat, lon) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`);
  const data = response.data;

  return data;
}
export const getWeatherForecast = async (lat, lon) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`);
  const data = response.data;

  return data;
}

export const getIconLink = async (icon) => {
  if (!icon) return false;
  await axios.get(`https://openweathermap.org/img/wn/${icon}@2x.png`);
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}


export const degrees = (deg) => {
  if (deg < 45) return 'С';
  else if (deg === 45) return 'СевероВосток';
  else if (deg <= 90) return 'Восток';
  else if (deg === 135) return 'ЮгоВосток';
  else if (deg <= 180) return 'Юг';
  else if (deg === 225) return 'ЮгоЗапад';
  else if (deg <= 270) return 'Запад';
  else if (deg === 315) return 'СевероЗапад';
  else return 'С';
}
