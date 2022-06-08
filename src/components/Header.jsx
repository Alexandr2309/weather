import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeather, getWeatherForecast } from '../openweather';
import { addForecast, clearForecast } from '../store/slices/forecastSlice';
import { setFullWeather } from '../store/slices/weatherSlice';
import { getCoordsCity } from './../openweather/index';
import { Search, SearchIconWrapper, StyledInputBase } from './../UI/style';
import { useNavigate } from 'react-router-dom';
import { setCity } from '../store/slices/citySlice';

const Header = ({setIsReady}) => {
  const [search, setSearch] = useState('');
  const today = useSelector(state => state.city.date);
  const city = useSelector(state => state.city.city);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const route = useNavigate();

  const handleChange = async (e) => {
    if (e.key === 'Enter') {
      route('../');
      setIsReady(false);
      dispatch(setCity(search.slice(0, 1).toUpperCase() + search.slice(1)));
      const coords = await getCoordsCity(search);
      const weather = await getWeather(coords.lat, coords.lng).then(res => {
        const jsonWeather = JSON.stringify(res.weather[0], (key, value) => {
          if (key === 'main' || key === 'description') return undefined;
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
            if (key === 'main' || key === 'description') return undefined;
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
    } 
  };

  return (
    <Box >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={e => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'start' }}>
            Погода
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleChange}
              placeholder="Поиск…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header