import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { getCoordsCity, getIconLink, getWeather, degrees } from './../openweather/index';
import codes from './../openweather/conditions_codes';
import { useSelector } from 'react-redux';
import MainCard from './Card';
import MainAccordion from './Accordion';
import { useParams } from 'react-router-dom';
import { switchDays } from './../utils/func';


const Main = () => {
  const weather = useSelector(state => state.weather);
  const city = useSelector(state => state.city.city);
  const { day } = useParams();
  const howDay = switchDays(day);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 25, }}>
      <MainCard
        weather={weather}
        city={city}
      />
      {howDay === 'today' &&
        <MainAccordion
          weather={weather}
          degrees={degrees}
        />
      }
    </div>
  )
};

export default Main;