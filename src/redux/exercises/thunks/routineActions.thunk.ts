import { createAsyncThunk } from '@reduxjs/toolkit';
import { Routine, WorkoutPlan } from 'redux/types';
import {
  getItemByKey,
  setItemByKey,
} from 'redux/exercises/requests/asyncStorage.requests';
import { WORKOUT_ASYNC_STORAGE_KEYS } from 'shared/constants/keys';
import { AddWorkoutPlanResponse } from 'redux/exercises/thunks/workoutPlan.thunk';

export const reorderRoutine = createAsyncThunk<
  AddWorkoutPlanResponse & {
    plan?: WorkoutPlan | undefined;
    routineId?: string;
  },
  { routineId: string; planName: string; routine: Routine }
>('add/reorderRoutine', async ({ routineId, planName, routine }) => {
  try {
    let updatedList: WorkoutPlan[] = [];
    let newRoutines: Routine[] = [];
    let selectedPlan: WorkoutPlan | undefined;
    const plans = await getItemByKey(WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS);

    const parsedData: WorkoutPlan[] = plans ? await JSON.parse(plans) : [];

    const plan = parsedData.find(el => el.name === planName);
    if (plan?.routines) {
      newRoutines = plan.routines.map(el =>
        el.id === routine.id ? routine : el
      );
      selectedPlan = { ...plan, routines: newRoutines };
      updatedList = parsedData.map(elem =>
        elem.name === planName
          ? {
              ...elem,
              routines: newRoutines,
            }
          : elem
      );
    } else {
      selectedPlan = plan;
    }

    await setItemByKey(
      WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS,
      JSON.stringify(updatedList)
    );
    return {
      plans: updatedList,
      plan: selectedPlan,
      routineId: routine.id,
      status: true,
    };
  } catch (e) {
    return { status: false };
  }
});
