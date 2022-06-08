import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const NextDayCard = ({ src, title, subtitle, tempDay, tempNight, description, day }) => {
  const route = useNavigate();
  const routeDay = () => {
    route(`../forecast/${day}`);
  }
  return (
    <ListItem sx={{
      flex: '1 1 auto', padding: '0 0', '& *': {
        textAlign: 'center'
      }
    }}>
      <Paper elevation={3} sx={{ width: '100%', height: '100%' }} onClick={routeDay}>
        <ListItemButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ListItemText >
            {title || ''}
            <Typography component='p' variant='subtitle2' sx={{ opacity: .7 }}>{subtitle}</Typography>
          </ListItemText>
          <Tooltip title={description} placement="right-end">
            <ListItemIcon>
              <img src={`https://openweathermap.org/img/wn/${src.slice(0, src.length-1)}d@2x.png` || ''} alt="icon-list" />
            </ListItemIcon>
          </Tooltip>
          <ListItemText>
            {tempDay || 0}<sup>o</sup>C
            <Typography component='p' variant='subtitle2' sx={{ opacity: .7 }}>{tempNight || ''}<sup>o</sup>C</Typography>
          </ListItemText>
          <Typography component='p' variant='subtitle2' sx={{ opacity: .7 }}>{description || ''}</Typography>
        </ListItemButton>
      </Paper>
    </ListItem>
  )
};

export default NextDayCard;