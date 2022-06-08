import { CardActionArea, Divider, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import clear from '../images/conditions/clear.jpg';
import svg from '../images/icons/белые полые/bkn_+ra_d.svg';
import wind from '../images/icons/иконки давления_влажности_ветра белые сплошные/ic_wind.svg';
import humidity from '../images/icons/иконки давления_влажности_ветра цветные для всетлого фона/ic_humidity.svg';
import compass from '../images/icons/иконки давления_влажности_ветра цветные для всетлого фона/ic_pressure.svg';
import { getIconLink } from '../openweather';
import { setDate, setTime } from '../store/slices/citySlice';
import codes from './../openweather/conditions_codes';
import imgCode from './../openweather/images';
import { getMonth, getNormalizeData, switchDays } from './../utils/func';
import Forecast from './Forecast';


const MainCard = ({ weather, city }) => {
  const dispatch = useDispatch();

  const [back, setBack] = useState(`url(${clear})`)
  const [currentTime, setCurrentTime] = useState(getNormalizeData(new Date()));
  const [img, setImg] = useState('');
  const nowWeather = useSelector(state => state.weather);
  const forecast = useSelector(state => state.forecast);
  const { day } = useParams();
  const howDay = switchDays(day);

  let forecastNow = forecast[howDay];
  const [strDate, setStrDate] = useState('')
  const [monthTitle, setMonthTitle] = useState('')

  const [temp, setTemp] = useState(Math.round(weather.main?.temp));
  const [feels, setFeels] = useState(Math.round(weather.main?.feels_like));
  const [speed, setSpeed] = useState(Math.floor(weather.wind?.speed));
  const [humidityV, setHumidity] = useState(weather.main?.humidity);
  const [pressure, setPressure] = useState((weather.main?.pressure / 1.333).toFixed());

  const getImg = async () => {
    const icon = await getIconLink(weather.weather.icon);
    setImg(icon);
  };

  async function getCurrentTime(lat, lon) {
    const domParser = new DOMParser();
    const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?by=position&lat=${lat}&lng=${lon}&key=HRCO44VPSUJB`);
    const data = await response.text();
    const xmlData = domParser.parseFromString(data, 'text/xml');
    let time = await xmlData.querySelector('formatted').textContent;
    dispatch(setDate(time.replace(/ \d\d:\d\d:\d\d/, '')));
    return time;
  }

  useEffect(() => {
    if (!Object.values(nowWeather.weather).includes(null)) {
      setBack(`url(${imgCode(weather.weather.id)})`);
      let { lat, lon } = { ...weather.coord };
      getImg();
      getCurrentTime(lat, lon).then(res => {
        let time = new Date(res);
        dispatch(setTime(res));
        const currentTime = getNormalizeData(time)
        setCurrentTime(currentTime)
      });
    }
  }, [weather, nowWeather])
  useEffect(() => {
    if (forecastNow.dateNow) {
      if (howDay !== 'today') {
        const strDate = forecastNow.dateNow.match(/\d+/g);
        setStrDate(forecastNow.dateNow.match(/\d+/g)[2]);
        setMonthTitle(getMonth(new Date(+strDate[0], +strDate[1] - 1, +strDate[2])));
        let index = Math.ceil(forecastNow.list.length / 2)

        setTemp(Math.round(forecastNow.list[index].main.temp));
        setSpeed(Math.floor(forecastNow.list[index].wind.speed));
        setFeels(Math.round(forecastNow.list[index].main.feels_like));
        setHumidity(forecastNow.list[index].main.humidity);
        setPressure((forecastNow.list[index].main.pressure / 1.333).toFixed());
        return;
      };
      setTemp(Math.round(weather.main?.temp))
      setFeels(Math.round(weather.main?.feels_like))
      setSpeed(Math.floor(weather.wind?.speed))
      setHumidity(weather.main?.humidity)
      setPressure((weather.main?.pressure / 1.333).toFixed())
    }
  }, [forecastNow])

  return (
    <Card sx={{ width: '100%', backgroundImage: `${back}`, height: 'auto', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', color: 'white' }}>
      <div className="" style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'black', opacity: .2, width: '100%', height: '100%' }}></div>
      <Typography
        variant="h6" component="div"
        sx={{ textAlign: 'left', padding: '0 10px', mt: 1.5, fontWeight: 'bold', zIndex: 10, position: 'relative' }}
      >
        {city || weather.name}
      </Typography>
      <Typography
        variant="body2" component="div"
        sx={{ textAlign: 'left', padding: '0 10px', mt: 0.25, zIndex: 10, position: 'relative', fontSize: '16px' }}
      > {howDay === 'today' ? `Сейчас ${currentTime}` : `${strDate}, ${monthTitle}`}
      </Typography>
      <CardActionArea sx={{ mt: 17 }}>
        <CardContent sx={{ mt: '-50px' }}>
          <div className="" style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ fontSize: 38, color: 'white', mr: 1 }}>
              {temp || ''} <sup>o</sup>C
            </Typography>
            <img src={img || svg} alt="" width="48" height="48" />
            <div className="" style={{ marginLeft: 10 }}>
              <Typography variant="body2" component="div" sx={{ fontSize: 18, textAlign: 'start', color: 'white' }}>{codes[weather.weather?.id] || 'Нет данных'}</Typography>
              <Typography variant="body2" component="div" sx={{ fontSize: 16, color: 'gray' }}>Ощущается как {feels || ''}<sup>o</sup>C</Typography>
            </div>
          </div>
          <div className="" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="" style={{ display: 'flex', alignItems: 'center', columnGap: 5, margin: '0px 7px' }}>
              <img src={wind} alt="" />
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ mb: 0 }}>
                {speed || ''} М/С
              </Typography>
            </div>
            <div className="" style={{ display: 'flex', alignItems: 'center', columnGap: 5, margin: '0px 7px' }}>
              <img src={humidity} alt="" />
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ mb: 0 }}>
                {humidityV || ''} %
              </Typography>
            </div>
            <div className="" style={{ display: 'flex', alignItems: 'center', columnGap: 5, margin: '0px 7px' }}>
              <img src={compass} alt="" />
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ mb: 0 }}>
                {pressure || ''} мм.рт.ст.
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      {forecastNow.dateNow
        ? <>
          <Divider />
          <Box sx={{ position: 'relative', zIndex: 10, flexGrow: 1, margin: '10px 0', padding: '20px 60px' }} >
            <Grid sx={{ alignItems: 'center', justifyContent: 'center', marginTop: '-20px' }} container >
              {forecastNow.list.map((item, index) => {
                return <Forecast img={item.weather.icon} tooltip={codes[item.weather.id]} temp={Math.round(item.main.temp)} time={item.dt.slice(0, 5)} key={index} />
              })}
            </Grid>
          </Box>
        </>
        : ''
      }
    </Card >
  )
};

export default MainCard;