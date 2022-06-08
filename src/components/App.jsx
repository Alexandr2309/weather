import Backdrop from '@mui/material/Backdrop';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import loadingGif from '../images/GvCAA.gif';
import { setCity } from '../store/slices/citySlice';
import Header from './Header';
import Main from './Main';
import NextDays from './NextDays';
import { getWeather, getWeatherForecast } from '../openweather';
import { addForecast, clearForecast } from '../store/slices/forecastSlice';
import { setFullWeather } from '../store/slices/weatherSlice';
import { getCoordsCity } from './../openweather/index';

function App({ day = '' }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (e, value) => setPage(value);
  const weather = useSelector(state => state.weather);
  const route = useNavigate();
  const [isReady, setIsReady] = useState(true);
  const today = useSelector(state => state.city.date);

  useEffect(() => {
    if (!weather.name) {
      route('/');
    }
  }, [weather]);

  async function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        axios.get(`https://graphhopper.com/api/1/geocode?reverse=true&point=${res.coords.latitude},${res.coords.longitude}&key=${process.env.REACT_APP_GRAPHHOPPER_API_KEY}`)
          .then(response => {
            dispatch(setCity(response.data.hits[0].city));
            route('../');
            setIsReady(false)
            const coords = getCoordsCity(response.data.hits[0].city).then(coords => {
              getWeather(coords.lat, coords.lng).then(res => {
                const jsonWeather = JSON.stringify(res.weather[0], (key, value) => {
                  if (key == 'main' || key == 'description') return undefined;
                  return value
                });
                dispatch(setFullWeather({
                  name: res.name,
                  main: res.main,
                  weather: JSON.parse(jsonWeather),
                  wind: res.wind,
                  dt: res.dt,
                  timezone: res.timezone,
                  coord: res.coord
                }));
              });
              dispatch(clearForecast());
              getWeatherForecast(coords.lat, coords.lng).then(res => {
                let currentDay = 0;
                let currentDate = today;
                res.list.forEach(item => {
                  const jsonWeather = JSON.stringify(item.weather[0], (key, value) => {
                    if (key == 'main' || key == 'description') return undefined;
                    return value
                  });
                  let objToPush = {
                    main: item.main,
                    weather: JSON.parse(jsonWeather),
                    wind: item.wind,
                    dt: item.dt_txt.split(' ')[1],
                    coord: item.coord
                  }
                  if (item.dt_txt.includes(currentDate)) {
                    dispatch(addForecast({
                      dateNow: currentDate,
                      obj: objToPush,
                      day: currentDay
                    }));
                  } else {
                    ++currentDay;
                    currentDate = item.dt_txt.replace(/ \d\d:\d\d:\d\d/, '');
                    dispatch(addForecast({
                      dateNow: currentDate,
                      obj: objToPush,
                      day: currentDay
                    }))
                  }
                })
                setIsReady(true)
              })
            });

          }).catch(err => console.log(err))
      });
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getUserLocation()
  }, []);

  return (
    <div className="App">
      {isReady
        ? <>
          <Header setIsReady={setIsReady} />
          <Container >
            <Main />
            <NextDays isReady={isReady} setIsReady={setIsReady} />
          </Container>
        </>
        :
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isReady}
        >
          <img src={loadingGif} alt="" />
        </Backdrop>
      }
    </div>
  );
}

export default App;
