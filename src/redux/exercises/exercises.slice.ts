import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getExercises } from './exrcises.thunk';
import { ExercisesState } from './types';

const initialState: ExercisesState = {
  exercises: [],

  loading: false,
  error: '',
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getExercises.fulfilled, (state, action) => {
      state.exercises = action.payload;

      state.loading = false;
    });
    builder.addCase(getExercises.pending, state => {
      state.loading = false;
    });
    builder.addCase(getExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = JSON.stringify({ error: action.payload });
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = exercisesSlice.actions;
export const exercises = (state: RootState) => state.exercises.exercises;

export const { reducer } = exercisesSlice;
