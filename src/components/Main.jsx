import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { degrees } from './../openweather/index';
import { switchDays } from './../utils/func';
import MainAccordion from './Accordion';
import MainCard from './Card';


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