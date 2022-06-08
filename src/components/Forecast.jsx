import { Grid, Tooltip } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Forecast = ({ img, time, temp, tooltip, day }) => {
  return (
    <Tooltip title={tooltip} followCursor placement='right'>
      <Grid item xs sx={{
        display: 'flex', paddingTop: '30px', flexDirection: 'column', alignItems: 'center', '&:hover': {
          boxShadow: "0 8px 16px 0 rgb(0 0 0 / 12%), 0 0 1px 1px rgb(0 0 0 / 8%)"
        }, flex: '0 1 auto'
      }} 
      >
        <Typography component='h5' variant=''>{time || 12}</Typography>
        <img src={`https://openweathermap.org/img/wn/${img}@2x.png` || ''} alt="icon-list" />
        <Typography component='span' variant='body1'>{temp || 0}<sup>o</sup>C</Typography>
      </Grid>
    </Tooltip>
  )
};

export default Forecast;