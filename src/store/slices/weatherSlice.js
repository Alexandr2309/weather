import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  dt: null,
  coord: {

  },
  timezone: 0,
  main: {
    temp_max: null,
    temp_min: null,
    humidity: null,
    pressure: null,
    feels_like: null,
    visibility: null,
  },
  weather: {
    id: null,
    icon: null,
  },
  wind: {
    deg: null,
    speed: null
  }
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setFullWeather: (state, action) => {
      state.main = action.payload.main;
      state.weather = action.payload.weather;
      state.wind = action.payload.wind;
      state.name = action.payload.name;
      state.sunrise = action.payload.sunrise;
      state.sunset = action.payload.sunset;
      state.dt = action.payload.dt;
      state.timezone = action.payload.timezone / 60 / 60;
      state.coord = action.payload.coord;
    },
    setDt: (state, action) => {
      state.dt = action.payload;
    }
  }
});

export const { setFullWeather, setDt } = weatherSlice.actions;
export default weatherSlice.reducer;

