import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ExercisesState } from '../types';
import {
  addExtraImage,
  deleteImage,
  getExercises,
} from 'redux/exercises/thunks/exrcises.thunk';
import {
  bodyParts,
  equipment,
  filter,
  increment,
  targets,
  total,
  types,
} from 'redux/exercises/actions';
import { filterExercises } from 'redux/exercises/reducerActions';
import {
  addExercisesToRoutine,
  addRoutine,
  addWorkoutPlan,
  getAllPlans,
} from 'redux/exercises/thunks/workoutPlan.thunk';

const selectedFilters = (builder: ActionReducerMapBuilder<ExercisesState>) => {
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
};

const getExercisesCases = (
  builder: ActionReducerMapBuilder<ExercisesState>
) => {
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
};

const images = (builder: ActionReducerMapBuilder<ExercisesState>) => {
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
};

const workoutPlans = (builder: ActionReducerMapBuilder<ExercisesState>) => {
  builder.addCase(getAllPlans.fulfilled, (state, action) => {
    if (action.payload.data) {
      state.workoutPlans = action.payload.data;
      state.selectedWorkoutPlan = !state.selectedWorkoutPlan
        ? action.payload.data[0]
        : state.selectedWorkoutPlan;
    } else {
      state.error = action.payload.error;
    }
  });
  builder.addCase(getAllPlans.rejected, (state, action) => {
    state.error = JSON.stringify(action.error);
  });
  builder.addCase(getAllPlans.pending, state => {
    state.loading = true;
  });
  builder.addCase(addWorkoutPlan.fulfilled, (state, action) => {
    if (action.payload.plans) {
      state.workoutPlans = action.payload.plans;
      state.selectedWorkoutPlan = action.payload.plan;
    } else {
      state.error = action.payload.error;
    }
  });
  builder.addCase(addWorkoutPlan.rejected, (state, action) => {
    state.error = JSON.stringify(action.error);
  });
  builder.addCase(addWorkoutPlan.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(addRoutine.fulfilled, (state, action) => {
    state.workoutPlans = action.payload.plans;
    if (action.payload.addedRoutine) {
      state.selectedWorkoutPlan?.routines.push(action.payload.addedRoutine);
    }
    state.selectedRoutine = action.payload.addedRoutine;
  });
  builder.addCase(addExercisesToRoutine.fulfilled, (state, action) => {
    state.workoutPlans = action.payload.plans;
    if (action.payload.plan) {
      state.selectedWorkoutPlan = action.payload.plan;
      state.selectedRoutine = action.payload.plan.routines.find(
        el => el.id === action.payload.routineId
      );
    }
  });
};

export const extraReducers = (
  builder: ActionReducerMapBuilder<ExercisesState>
) => {
  workoutPlans(builder);
  getExercisesCases(builder);
  selectedFilters(builder);
  builder.addCase(filter, filterExercises);
  images(builder);
  builder.addCase(increment, state => {
    state.exercisesLoaded++;
  });
  builder.addCase(total, (state, action) => {
    state.totalExercisesCount = action.payload;
  });
};
