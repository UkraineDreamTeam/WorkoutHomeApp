import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutForm } from 'redux/workoutForm/types';
import { RootState } from 'redux/store';

const initialState: {
  form: WorkoutForm;
  forms: WorkoutForm[];
} = {
  form: {
    id: '',
    weight: 0,
    setRestTime: { minutes: '00', seconds: '00' },
    reps: 0,
    sets: 1,
    setRestTimeMS: 0,
    duration: { minutes: '00', seconds: '00' },
    durationMS: 0,
  },
  forms: [],
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
      state.form.setRestTime = {
        minutes:
          action.payload?.restTime?.minutes || state.form.setRestTime?.minutes,
        seconds:
          action.payload?.restTime?.seconds || state.form.setRestTime?.seconds,
      };

      state.form.setRestTimeMS = action.payload.ms || state.form.setRestTimeMS;
      state.forms = state.forms.map(el => ({
        ...el,
        setRestTime: state.form.setRestTime,
        setRestTimeMS: state.form.setRestTimeMS,
      }));
    },
    setDuration: (
      state,
      action: PayloadAction<{
        duration: { seconds?: string; minutes?: string };
        ms?: number;
      }>
    ) => {
      state.form.duration = {
        minutes:
          action.payload?.duration?.minutes || state.form.duration?.minutes,
        seconds:
          action.payload?.duration?.seconds || state.form.duration?.seconds,
      };
      state.form.durationMS = action.payload?.ms || state.form.durationMS;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.form.weight = action.payload;
    },
    setReps: (state, action: PayloadAction<number>) => {
      state.form.reps = action.payload;
    },
    setSets: (state, action: PayloadAction<number>) => {
      state.form.sets = action.payload;
    },
    addForm: (state, action: PayloadAction<WorkoutForm>) => {
      state.forms.push(action.payload);
    },
    retrieveSetsFromExercise: (state, action: PayloadAction<WorkoutForm[]>) => {
      state.forms = action.payload;
    },
    clearForms: state => {
      state.form = initialState.form;
      state.forms = initialState.forms;
    },
    deleteSet: (state, action: PayloadAction<string>) => {
      state.forms = state.forms.filter(set => set.id !== action.payload);
    },
  },
});

export const {
  setRestBetweenSets,
  setDuration,
  setSets,
  setReps,
  setWeight,
  addForm,
  retrieveSetsFromExercise,
  clearForms,
  deleteSet,
} = workoutFormSlice.actions;

export const restTime = (state: RootState) =>
  state.workoutForm.form.setRestTime;
export const restTimeMS = (state: RootState) =>
  state.workoutForm.form.setRestTimeMS;
export const form = (state: RootState) => state.workoutForm.form;
export const sets = (state: RootState) => state.workoutForm.forms;
export const workoutFormReducer = workoutFormSlice.reducer;
