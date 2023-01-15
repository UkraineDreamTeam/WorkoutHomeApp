import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutForm } from 'redux/workoutForm/types';
import { RootState } from 'redux/store';

const initialState: WorkoutForm = {
  weigth: '0',
  setRestTime: { minutes: '00', seconds: '00' },
  reps: 0,
  sets: 0,
  setRestTimeMS: 0,
  duration: { minutes: '00', seconds: '00' },
  durationMS: 0,
};

export const workoutFormSlice = createSlice({
  name: 'workoutForm',
  initialState,
  reducers: {
    setRestBetweenSets: (
      state,
      action: PayloadAction<{
        restTime: { seconds?: string; minutes?: string };
        ms?: number;
      }>
    ) => {
      state.setRestTime = {
        minutes:
          action.payload?.restTime?.minutes || state.setRestTime?.minutes,
        seconds:
          action.payload?.restTime?.seconds || state.setRestTime?.seconds,
      };

      state.setRestTimeMS = action.payload.ms || state.setRestTimeMS;
    },
  },
});

export const { setRestBetweenSets } = workoutFormSlice.actions;

export const restTime = (state: RootState) => state.workoutForm.setRestTime;
export const restTimeMS = (state: RootState) => state.workoutForm.setRestTimeMS;
export const form = (state: RootState) => state.workoutForm;

export const workoutFormReducer = workoutFormSlice.reducer;
