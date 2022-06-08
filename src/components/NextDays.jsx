import { List } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import codes from './../openweather/conditions_codes';
import { getDay, getMonth, switchDays } from './../utils/func';
import NextDayCard from './NextDayCard';


const NextDays = ({isReady, setIsReady }) => {
  const { day: dayParam } = useParams();
  const howDay = switchDays(dayParam);
  const forecast = useSelector(state => state.forecast);
  const nextDays = forecast.today.dateNow ? Object.keys(forecast).slice(0, 5) : false;

  const createItem = (day, forecast, index) => {
    let tD = 0, tN = 0, tempD = 0, tempN = 0;
    const strDate = forecast[day].dateNow.match(/\d+/g);
    let dateTitle = getDay(new Date(+strDate[0], +strDate[1] - 1, +strDate[2]));
    let monthTitle = getMonth(new Date(+strDate[0], +strDate[1] - 1, +strDate[2]))
    if (day === 'today') {
      forecast[day].list.forEach((item, i) => {
        let averageDay = (Math.round(item.main.temp_max));
        let averageNight = (Math.round(item.main.temp_min));
        tD += averageDay;
        tN += averageNight;
      });
      tempD = Math.round(tD / forecast[day].list.length);
      tempN = Math.round(tN / forecast[day].list.length);
    } else {
      let elem = forecast[day].list;
      tempN += Math.round(Math.round(elem[0].main.temp + elem[1].main.temp) / 2);
      tempD += Math.round(Math.round(elem[4].main.temp_max + elem[5].main.temp_max) / 2);
    }
    const listItem = Math.floor(forecast[day].list.length / 2);
    return (
      <NextDayCard src={forecast[day].list[listItem].weather.icon} title={(index == 0 && howDay === 'today') ? 'Сегодня' : dateTitle} subtitle={`${strDate[2]}, ${monthTitle}`} tempDay={tempD} tempNight={tempN} key={index.toString() + Math.random()} description={codes[forecast[day].list[listItem].weather.id]} day={day} />
    )
  };

  return (
    <div style={{}}>
      <Divider sx={{ m: '0 auto', paddingTop: '5px' }} />
      <Box sx={{}}>
        <List sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '15px', columnGap: 5 }}>
          {nextDays
            ? nextDays.map((day, index) => {
              return createItem(day, forecast, index);
            })
            : ''
          }
        </List>
      </Box>
    </div>
  )
};

export default NextDays;