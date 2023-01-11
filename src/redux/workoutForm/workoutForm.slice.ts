import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const workoutFormSlice = createSlice({
  name: 'workoutForm',
  initialState,
  reducers: {},
});

export const {} = workoutFormSlice.actions;

export const workoutFormReducer = workoutFormSlice.reducer;
