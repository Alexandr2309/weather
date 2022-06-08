import { createSlice } from '@reduxjs/toolkit';

const dateNow = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`;

const initialState = {
  city: '',
  time: null,
  date: dateNow,
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    }
  }
});

export const { setCity, setTime, setDate } = citySlice.actions;
export default citySlice.reducer;
