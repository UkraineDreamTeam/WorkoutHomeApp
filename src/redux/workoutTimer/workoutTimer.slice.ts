import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';
import { WorkoutItemInProgress } from 'redux/workoutTimer/types';
import { WorkoutForm } from 'redux/workoutForm/types';

const initialState: {
  isRest: boolean;
  timer: number;
  duration: number;
  setsArray: { [key: string]: WorkoutItemInProgress[] };
} = {
  isRest: false,
  timer: 0,
  duration: 0,
  setsArray: {},
};

export const workoutTimerSlice = createSlice({
  name: 'workoutTimer',
  initialState,
  reducers: {
    handleRunTimer: state => {
      state.timer -= 1;
    },
    setRestTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
      state.isRest = true;
    },
    setExerciseTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
      state.isRest = false;
    },
    changeDuration: state => {
      state.duration += 1;
    },
    setArrayOfSets: (
      state,
      action: PayloadAction<{ id: string; data: WorkoutForm[] }>
    ) => {
      state.setsArray[action.payload.id] = action.payload.data.reduce(
        (current, next) => {
          let setCount = next.sets;
          const arrayOfSets = [];
          while (setCount > 0) {
            arrayOfSets.push({
              ...next,
              id: nanoid(),
              isCompleted: false,
              isSkipped: false,
            });
            setCount--;
          }

          return current.concat(arrayOfSets);
        },
        [] as WorkoutItemInProgress[]
      );
    },
    handleCompletedExercise: (
      state,
      action: PayloadAction<{ id: string; setId: string }>
    ) => {
      state.setsArray[action.payload.id] = state.setsArray[
        action.payload.id
      ].map(elem =>
        elem.id === action.payload.setId ? { ...elem, isCompleted: true } : elem
      );
    },
    handleSkipExercise: (
      state,
      action: PayloadAction<{ id: string; setId: string }>
    ) => {
      state.setsArray[action.payload.id] = state.setsArray[
        action.payload.id
      ].map(elem =>
        elem.id === action.payload.setId ? { ...elem, isSkipped: true } : elem
      );
    },
  },
});

export const {
  setRestTimer,
  setExerciseTimer,
  changeDuration,
  setArrayOfSets,
  handleCompletedExercise,
  handleRunTimer
} = workoutTimerSlice.actions;

export const isRest = (state: RootState) => state.timer.isRest;
export const duration = (state: RootState) => state.timer.duration;
export const timerCount = (state: RootState) => state.timer.timer;
export const setsArray = (state: RootState) => state.timer.setsArray;
export const workoutTimerReducer = workoutTimerSlice.reducer;
