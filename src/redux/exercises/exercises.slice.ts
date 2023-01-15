import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filterExercises } from './reducerActions';
import { ExercisesState, FilterNames, Routine } from '../types';
import { extraReducers } from 'redux/exercises/extraReducers';

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
  selectedFilters: { type: [], bodyPart: [], target: [], equipment: [] },
  modalVisible: false,
  temporaryFiltered: [],
  selectedWorkoutPlan: undefined,
  workoutPlans: undefined,
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    filterExercises,
    applyFilters: state => {
      state.filteredExercises = state.temporaryFiltered || state.exercises;
      for (const key in state.selectedFilters) {
        state.selectedFilters[key as FilterNames] = state.selectedFilters[
          key as FilterNames
        ].map(el => ({ ...el, selected: false, isSelectable: true }));
      }
    },
    clearFilters: state => {
      for (const key in state.selectedFilters) {
        state.selectedFilters[key as FilterNames] = state.selectedFilters[
          key as FilterNames
        ].map(el => ({ ...el, selected: false, isSelectable: true }));
      }
      state.filteredExercises = state.exercises;
    },
    selectWorkoutPlan: (state, action) => {
      if (state.workoutPlans && state.selectedWorkoutPlan) {
        state.selectedWorkoutPlan = state.workoutPlans?.find(
          item => item.name === action.payload
        );
      }
    },
    selectRoutine: (state, action: PayloadAction<Routine>) => {
      state.selectedRoutine = action.payload;
    },
  },
  extraReducers: extraReducers,
});

export const { clearFilters, applyFilters, selectWorkoutPlan, selectRoutine } =
  exercisesSlice.actions;

export const exercises = (state: RootState) =>
  state.exercises.filteredExercises;
export const exercisesLoaded = (state: RootState) =>
  state.exercises.exercisesLoaded;
export const totalExercisesCount = (state: RootState) =>
  state.exercises.totalExercisesCount;
export const selectedFilters = (state: RootState) =>
  state.exercises.selectedFilters;
export const workoutPlans = (state: RootState) => state.exercises.workoutPlans;
export const selectedPlan = (state: RootState) =>
  state.exercises.selectedWorkoutPlan;
export const selectedRoutine = (state: RootState) =>
  state.exercises.selectedRoutine;
export const exercisesReducer = exercisesSlice.reducer;
