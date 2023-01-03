import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HOURS, MINUTES, SECONDS } from '@shared/constants/options';
import { RootState } from '../store';
export type WeightUnits = keyof typeof weightMode.units.set;
export type TimeUnits = keyof typeof weightMode.units.time;

type ExerciseTypeWeight = {
  title: string;

  units: {
    set: {
      sets: number;
      reps: number;
      kg: number;
    };
    time: {
      h: number;
      min: number;
      sec: number;
    };
  };

  rest: boolean;
  selected: boolean;
};

type Exercise = {
  mode: ExerciseTypeWeight;
  hours: { value: string; selected: boolean }[];
  minutes: { value: string; selected: boolean }[];
  seconds: { value: string; selected: boolean }[];
};

const weightMode = {
  title: 'Weights/Bodyweight',

  units: {
    set: {
      sets: 0,
      reps: 0,
      kg: 0,
    },
    time: {
      h: 0,
      min: 0,
      sec: 0,
    },
  },

  rest: false,
  selected: true,
};

const initialState: Exercise = {
  mode: weightMode,
  hours: HOURS.map(el => ({ value: el, selected: false })),
  minutes: MINUTES.map(el => ({ value: el, selected: false })),
  seconds: SECONDS.map(el => ({ value: el, selected: false })),
};

export const exerciseSlice = createSlice({
  name: 'exerciseActions',
  initialState,
  reducers: {
    setSelected: (
      state,
      action: PayloadAction<{
        name: 'hours' | 'minutes' | 'seconds';
        option: string;
      }>
    ) => {
      state[action.payload.name] = state[action.payload.name].map(el =>
        el.value === action.payload.option
          ? { ...el, selected: true }
          : { ...el, selected: false }
      );
    },
  },
});

export const {} = exerciseSlice.actions;

export const mode = (state: RootState) => state.exerciseActions.mode;
export const hours = (state: RootState) => state.exerciseActions.hours;
export const minutes = (state: RootState) => state.exerciseActions.minutes;
export const seconds = (state: RootState) => state.exerciseActions.seconds;
export const { reducer } = exerciseSlice;
