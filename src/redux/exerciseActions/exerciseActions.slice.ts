import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
type ExerciseTypeTime = {
  title: string;
  units: {
    sets: Unit;
    time: Unit;
    km: Unit;
  };
  selected: boolean;
};
type ExerciseTypeWeight = {
  title: string;
  units: {
    sets: Unit;
    reps: Unit;
    kg: Unit;
  };
  selected: boolean;
};
type Unit = { minValue: number; maxValue: number; required: boolean };
export type WorkoutTypes = {
  weight: ExerciseTypeWeight;
  time: ExerciseTypeTime;
};
type Exercise = {
  workoutTypes: WorkoutTypes;
  selectedMode: ExerciseTypeTime | ExerciseTypeWeight | {};
};

const weightMode = {
  title: 'Weights/Bodyweight',
  units: {
    sets: { minValue: 1, maxValue: 999, required: true },
    reps: { minValue: 1, maxValue: 999, required: true },
    kg: { minValue: 0, maxValue: 999, required: false },
  },
  selected: true,
};
const timeMolde = {
  title: 'Time/Distance',
  units: {
    sets: { minValue: 1, maxValue: 999, required: true },
    time: { minValue: 1, maxValue: 999, required: true },
    km: { minValue: 0, maxValue: 999, required: false },
  },
  selected: false,
};
const initialState: Exercise = {
  workoutTypes: {
    weight: weightMode,
    time: timeMolde,
  },
  selectedMode: weightMode,
};

export const exerciseSlice = createSlice({
  name: 'exerciseActions',
  initialState,
  reducers: {
    selectType: (state, action: PayloadAction<keyof WorkoutTypes>) => {
      state.selectedMode = state.workoutTypes[action.payload];
      for (const key in state.workoutTypes) {
        state.workoutTypes[key as keyof WorkoutTypes].selected =
          key === action.payload ? true : false;
      }
    },
  },
});

export const { selectType } = exerciseSlice.actions;

export const mode = (state: RootState) => state.exerciseActions.selectedMode;
export const modes = (state: RootState) => state.exerciseActions.workoutTypes;

export const { reducer } = exerciseSlice;
