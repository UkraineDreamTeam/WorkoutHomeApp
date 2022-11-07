import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  bodyParts,
  equipment,
  increment,
  targets,
  total,
  types,
} from './actions';
import { getExercises } from './exrcises.thunk';
import { ExercisesState } from './types';

const initialState: ExercisesState = {
  exercises: [],
  loading: false,
  error: '',
  exercisesLoaded: 0,
  totalExercisesCount: 0,
  targets: [],
  bodyParts: [],
  equipment: [],
  types: [],
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getExercises.fulfilled, (state, action) => {
      if (action.payload.res?.error) {
        state.error = action.payload.res?.error;
      } else {
        if (action.payload.res?.data?.length) {
          state.exercises = action.payload.res?.data;
        }
      }

      state.loading = false;
    });
    builder.addCase(getExercises.pending, state => {
      state.loading = false;
    });
    builder.addCase(getExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = JSON.stringify({ error: action.payload });
    });
    builder.addCase(increment, state => {
      state.exercisesLoaded++;
    });
    builder.addCase(total, (state, action) => {
      state.totalExercisesCount = action.payload;
    });
    builder.addCase(targets, (state, action) => {
      state.targets = action.payload;
    });
    builder.addCase(bodyParts, (state, action) => {
      state.bodyParts = action.payload;
    });
    builder.addCase(types, (state, action) => {
      state.types = action.payload;
    });
    builder.addCase(equipment, (state, action) => {
      state.equipment = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = exercisesSlice.actions;

export const exercises = (state: RootState) => state.exercises.exercises;
export const exercisesLoaded = (state: RootState) =>
  state.exercises.exercisesLoaded;
export const totalExercisesCount = (state: RootState) =>
  state.exercises.totalExercisesCount;

export const filters = {
  equipmentList: (state: RootState) => state.exercises.equipment,
  bodyPartsList: (state: RootState) => state.exercises.bodyParts,
  typesList: (state: RootState) => state.exercises.types,
  targetsList: (state: RootState) => state.exercises.targets,
};

export const { reducer } = exercisesSlice;
