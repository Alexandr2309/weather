import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { normalizeStrTime } from './../utils/func';

const MainAccordion = ({ degrees, weather }) => {
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const time = useSelector(state => state.city.time);

  const getSun = async (lat, lng) => {
    await axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`).then(res => {
      let sunriseStr = res.data.results.sunrise.match(/\d\d:\d\d:\d\d/)[0].split(':');
      let sunsetStr = res.data.results.sunset.match(/\d\d:\d\d:\d\d/)[0].split(':');
      if (+sunriseStr[2] > 30) sunriseStr[1]++;
      if (+sunsetStr[2] > 30) sunsetStr[1]++;
      let sunrise = normalizeStrTime(sunriseStr[0], sunriseStr[1], weather.timezone);
      let sunset = normalizeStrTime(sunsetStr[0], sunsetStr[1], weather.timezone);
      setSunrise(sunrise);
      setSunset(sunset);
    });

  }
  useEffect(() => {
    if (time) {
      let { lon, lat } = { ...weather.coord };
      getSun(lat, lon);
    }
  }, [time, weather]);

  return (
    <Accordion
      sx={{
        width: '100%', '& p': {
          textAlign: 'left', p: 1
        }
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Дополнительная информация</Typography>
      </AccordionSummary>
      <Divider sx={{ mb: 3 }} />
      <AccordionDetails sx={{ mt: -2 }}>
        <Typography>
          Направление ветра: {degrees(weather.wind?.deg) || ''}
        </Typography>
        <Typography>
          Время восхода: {sunrise || 'Нет данных'}
        </Typography>
        <Typography>
          Время заката: {sunset || 'Нет данных'}
        </Typography>
        <Typography>
          Температура max: {Math.round(weather.main?.temp_max) || ''} <sup>o</sup>C
        </Typography>
        <Typography>
          Температура min: {Math.round(weather.main?.temp_min) || ''} <sup>o</sup>C
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
};

export default MainAccordion;