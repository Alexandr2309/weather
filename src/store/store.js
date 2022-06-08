import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './slices/weatherSlice';
import citySlice from './slices/citySlice';
import forecastSlice from './slices/forecastSlice';

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    city: citySlice,
    forecast: forecastSlice
  }
});

export default store;