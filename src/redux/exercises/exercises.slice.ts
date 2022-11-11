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
  filteredExercises: [],
  loading: false,
  error: '',
  exercisesLoaded: 0,
  totalExercisesCount: 0,
  targets: [],
  bodyParts: [],
  equipment: [],
  types: [],
  selectedFilters: {},
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    selectFilter: () =>
      // state,
      // {
      //   payload,
      // }: {
      //   payload: {
      //     filterName: 'bodyPart' | 'target' | 'type' | 'equipment';
      //     values: string;
      //   };
      // }
      {
        // state.selectedFilters = {
        //   ...state.selectedFilters,
        //   [payload.filterName]: (
        //     state.selectedFilters?.[payload.filterName] || []
        //   ).includes(payload.values)
        //     ? state.selectedFilters?.[payload.filterName]?.filter(
        //         value => value === payload.values
        //       )
        //     : [
        //         ...(state.selectedFilters?.[payload.filterName] || []),
        //         payload.values,
        //       ],
        // };
      },
    clearFilters: state => {
      state.selectedFilters = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(getExercises.fulfilled, (state, action) => {
      if (action.payload.res?.error) {
        state.error = action.payload.res?.error;
      } else {
        if (action.payload.res?.data?.length) {
          state.exercises = action.payload.res?.data;
          state.filteredExercises = action.payload.res?.data;
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

export const { selectFilter, clearFilters } = exercisesSlice.actions;

export const exercises = (state: RootState) => state.exercises.exercises;
export const exercisesLoaded = (state: RootState) =>
  state.exercises.exercisesLoaded;
export const totalExercisesCount = (state: RootState) =>
  state.exercises.totalExercisesCount;
export const selectedFilters = (state: RootState) =>
  state.exercises.selectedFilters;
export const filters = (state: RootState) => ({
  equipment: state.exercises.equipment,
  bodyPart: state.exercises.bodyParts,
  type: state.exercises.types,
  target: state.exercises.targets,
});

export const { reducer } = exercisesSlice;
