import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  bodyParts,
  equipment,
  filter,
  increment,
  targets,
  total,
  types,
} from './actions';
import { addExtraImage, deleteImage, getExercises } from './exrcises.thunk';
import { filterExercises } from './reducerActions';
import { ExercisesState } from '../types';

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
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setModalVisible: state => {
      state.modalVisible = state.modalVisible ? false : true;
    },
    filterExercises,
    clearFilters: state => {
      state.selectedFilters = {
        bodyPart: [],
        type: [],
        target: [],
        equipment: [],
      };
    },
    applyFilters: state => {
      state.filteredExercises = state.temporaryFiltered || state.exercises;
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
      state.selectedFilters.target = action.payload;
    });
    builder.addCase(bodyParts, (state, action) => {
      state.selectedFilters.bodyPart = action.payload;
    });
    builder.addCase(types, (state, action) => {
      state.selectedFilters.type = action.payload;
    });
    builder.addCase(equipment, (state, action) => {
      state.selectedFilters.equipment = action.payload;
    });
    builder.addCase(filter, filterExercises);
    builder.addCase(addExtraImage.fulfilled, (state, action) => {
      if (action.payload.length) {
        state.exercises = action.payload;
        state.filteredExercises = action.payload;
      }
    });
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.filteredExercises = action.payload;
      state.exercises = action.payload;
    });
  },
});

export const { setModalVisible, clearFilters, applyFilters } =
  exercisesSlice.actions;

export const modalVisibility = (state: RootState) =>
  state.exercises.modalVisible;

export const exercises = (state: RootState) =>
  state.exercises.filteredExercises;
export const exercisesLoaded = (state: RootState) =>
  state.exercises.exercisesLoaded;
export const totalExercisesCount = (state: RootState) =>
  state.exercises.totalExercisesCount;
export const selectedFilters = (state: RootState) =>
  state.exercises.selectedFilters;

export const { reducer } = exercisesSlice;
