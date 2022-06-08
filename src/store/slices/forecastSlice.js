import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  today: {
    dateNow: null,
    list: [],
  },
  tomorrow: {
    dateNow: null,
    list: [],
  },
  day3: {
    dateNow: null,
    list: [],
  },
  day4: {
    dateNow: null,
    list: [],
  },
  day5: {
    dateNow: null,
    list: [],
  },
  day6: {
    dateNow: null,
    list: [],
  }
}

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    addForecast: (state, action) => {
      const { dateNow, obj, day } = action.payload;
      switch (day) {
        case 0:
          state.today.dateNow = dateNow;
          state.today.list.push(obj)
          break;
        case 1:
          state.tomorrow.dateNow = dateNow;
          state.tomorrow.list.push(obj)
          break;
        case 2:
          state.day3.dateNow = dateNow;
          state.day3.list.push(obj)
          break;
        case 3:
          state.day4.dateNow = dateNow;
          state.day4.list.push(obj)
          break;
        case 4:
          state.day5.dateNow = dateNow;
          state.day5.list.push(obj)
          break;
        case 5:
          state.day6.dateNow = dateNow;
          state.day6.list.push(obj)
          break;
        default:
          break;
      }
    },
    clearForecast: (state) => {
      Object.keys(state).forEach((key) => {
        state[key].dateNow = null;
        state[key].list = [];
      });
    }
  }
});

export const { addForecast, clearForecast } = forecastSlice.actions;
export default forecastSlice.reducer;

