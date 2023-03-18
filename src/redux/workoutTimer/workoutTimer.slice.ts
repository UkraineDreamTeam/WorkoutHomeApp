import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';
import { State, WorkoutItemInProgress } from 'redux/workoutTimer/types';
import { WorkoutForm } from 'redux/workoutForm/types';

const initialState: State = {
  isRest: false,
  timer: 0,
  duration: 0,
  setsArray: {},
  currentSet: '',
  setId: '',
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
    setCurrentWorkout: (state, action: PayloadAction<string>) => {
      state.currentSet = action.payload;
    },
    setCurrentSetId: (state, action: PayloadAction<string>) => {
      state.setId = action.payload;
    },
    handleCompletedExercise: (state, action: PayloadAction<{ id: string }>) => {
      state.setsArray[action.payload.id] = state.setsArray[
        action.payload.id
      ].map(elem =>
        elem.id === state.setId ? { ...elem, isCompleted: true } : elem
      );
    },
    handleSkipExercise: state => {
      state.setsArray[state.currentSet] = state.setsArray[state.currentSet].map(
        elem =>
          elem.id === state.setId
            ? { ...elem, isSkipped: true, isCompleted: true }
            : elem
      );

      state.setId =
        state.setsArray[state.currentSet].find(
          (elem, i, arr) => i !== 0 && arr[i - 1].id === state.setId
        )?.id || '';
      state.timer = 0;
      state.isRest = true;
    },
  },
});

export const {
  setRestTimer,
  setExerciseTimer,
  changeDuration,
  setArrayOfSets,
  handleCompletedExercise,
  handleRunTimer,
  setCurrentWorkout,
  setCurrentSetId,
  handleSkipExercise,
} = workoutTimerSlice.actions;

export const isRest = (state: RootState) => state.timer.isRest;
export const time = (state: RootState) => state.timer.timer;
export const duration = (state: RootState) => state.timer.duration;
export const timerCount = (state: RootState) => state.timer.timer;
export const setsArray = (state: RootState) => state.timer.setsArray;
export const currentExercise = (state: RootState) => state.timer.currentSet;
export const currentSetId = (state: RootState) => state.timer.setId;
export const workoutTimerReducer = workoutTimerSlice.reducer;
