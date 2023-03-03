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
  deleteRoutine,
  getAllPlans,
  updateExerciseInRoutine,
} from 'redux/exercises/thunks/workoutPlan.thunk';
import { reorderRoutine } from 'redux/exercises/thunks/routineActions.thunk';

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
    if (action.payload.res?.status && action.payload.res?.data?.length) {
      state.exercises = action.payload.res?.data;
      state.filteredExercises = action.payload.res?.data;
    }
    state.status = action.payload.res?.status;
    state.loading = false;
  });

  builder.addCase(getExercises.pending, state => {
    state.loading = true;
  });
  builder.addCase(getExercises.rejected, (state, action) => {
    state.loading = false;
    state.status = false;
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
      state.status = action.payload.status;
    }
    state.loading = false;
  });
  builder.addCase(getAllPlans.rejected, (state, action) => {
    state.status = false;
    state.loading = false;
  });
  builder.addCase(getAllPlans.pending, state => {
    state.loading = true;
  });
  builder.addCase(addWorkoutPlan.fulfilled, (state, action) => {
    if (action.payload.plans) {
      state.workoutPlans = action.payload.plans;
      state.selectedWorkoutPlan = action.payload.plan;
    } else {
      state.status = action.payload.status;
    }
  });
  builder.addCase(addWorkoutPlan.rejected, (state, action) => {
    state.status = false;
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
    state.status = action.payload.status;
  });
  builder.addCase(addExercisesToRoutine.fulfilled, (state, action) => {
    state.workoutPlans = action.payload.plans;
    if (action.payload.plan && action.payload.routineId) {
      state.selectedWorkoutPlan = action.payload.plan;
      console.log(action.payload.plan.routines);
      state.selectedRoutine = action.payload.plan.routines.find(
        el => el.id === action.payload.routineId
      );
    }
  });
  builder.addCase(updateExerciseInRoutine.fulfilled, (state, action) => {
    state.workoutPlans = action.payload.plans;
    if (action.payload.plan) {
      state.selectedWorkoutPlan = action.payload.plan;
      state.selectedRoutine = action.payload.plan.routines.find(
        el => el.id === action.payload.routineId
      );
    }
  });
  builder.addCase(reorderRoutine.fulfilled, (state, action) => {
    state.workoutPlans = action.payload.plans;
    if (action.payload.plan) {
      state.selectedWorkoutPlan = action.payload.plan;
      state.selectedRoutine = action.payload.plan.routines.find(
        el => el.id === action.payload.routineId
      );
    }
    state.isReordering = false;
  });
  builder.addCase(reorderRoutine.rejected, (state, action) => {
    state.status = false;

    state.isReordering = false;
  });
  builder.addCase(deleteRoutine.fulfilled, (state, action) => {
    state.workoutPlans = action.payload.plans;
    console.log('deleted routine');
    if (action.payload.plan) {
      console.log('deleted routine');
      state.selectedWorkoutPlan = action.payload.plan;
      state.selectedRoutine = action.payload.plan?.routines[0] || undefined;
    }
  });
  builder.addCase(deleteRoutine.rejected, (state, action) => {
    state.status = false;
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
