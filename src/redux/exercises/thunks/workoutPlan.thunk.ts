import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { WORKOUT_ASYNC_STORAGE_KEYS } from '@shared/constants/keys';
import { Routine, WorkoutExercise, WorkoutPlan } from '@redux/types';
import {
  getItemByKey,
  setItemByKey,
} from '@redux/exercises/requests/asyncStorage.requests';

type GetAllPlansResponse = { data?: WorkoutPlan[]; error?: any };
export const getAllPlans = createAsyncThunk<GetAllPlansResponse>(
  'get/allPlans',
  async () => {
    try {
      const allPlans = await getItemByKey(
        WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS
      );

      const parsedPlans = allPlans ? JSON.parse(allPlans) : [];

      return { data: parsedPlans };
    } catch (e) {
      return { error: e };
    }
  }
);
type AddWorkoutPlanResponse = {
  plans?: WorkoutPlan[];
  error?: any;
};
export const addWorkoutPlan = createAsyncThunk<AddWorkoutPlanResponse, string>(
  'add/workoutplan',
  async planName => {
    try {
      let updatedList: WorkoutPlan[];
      const plans = await getItemByKey(
        WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS
      );

      if (plans) {
        const parsedData = await JSON.parse(plans);
        updatedList = [{ name: planName, routines: [] }, ...parsedData];
      } else {
        updatedList = [{ name: planName, routines: [] }];
      }
      await setItemByKey(
        WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS,
        JSON.stringify(updatedList)
      );

      return { plans: updatedList };
    } catch (e) {
      return { error: true };
    }
  }
);

export const addRoutine = createAsyncThunk<
  AddWorkoutPlanResponse & { addedRoutine?: Routine },
  { routine: string; planName: string }
>('add/routine', async ({ routine, planName }) => {
  try {
    let updatedList: WorkoutPlan[] = [];

    const plans = await getItemByKey(WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS);

    const parsedData: WorkoutPlan[] = plans ? await JSON.parse(plans) : [];
    const newRoutine = { name: routine, data: [], id: nanoid() };
    updatedList = parsedData.map(elem =>
      elem.name === planName
        ? {
            ...elem,
            routines: [...elem.routines, newRoutine],
          }
        : elem
    );

    await setItemByKey(
      WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS,
      JSON.stringify(updatedList)
    );

    return { plans: updatedList, addedRoutine: newRoutine };
  } catch (e) {
    console.log(e);
    return { error: true };
  }
});

export const addExercisesToRoutine = createAsyncThunk<
  AddWorkoutPlanResponse & {
    plan?: WorkoutPlan | undefined;
    routineId?: string;
  },
  { routineId: string; planName: string; exercises: WorkoutExercise[] }
>('add/exercisesToRoutine', async ({ routineId, planName, exercises }) => {
  try {
    let updatedList: WorkoutPlan[] = [];
    let newRoutines: Routine[];
    let selectedPlan: WorkoutPlan | undefined;
    const plans = await getItemByKey(WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS);

    const parsedData: WorkoutPlan[] = plans ? await JSON.parse(plans) : [];

    const plan = parsedData.find(el => el.name === planName);
    if (plan?.routines) {
      newRoutines = plan.routines.map(el =>
        el.id === routineId ? { ...el, data: [...el.data, ...exercises] } : el
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

    return { plans: updatedList, plan: selectedPlan, routineId };
  } catch (e) {
    console.log(e);
    return { error: true };
  }
});
