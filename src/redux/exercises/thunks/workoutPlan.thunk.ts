import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { WORKOUT_ASYNC_STORAGE_KEYS } from '@shared/constants/keys';
import { Routine, WorkoutExercise, WorkoutPlan } from '@redux/types';
import {
  getItemByKey,
  setItemByKey,
} from '@redux/exercises/requests/asyncStorage.requests';

type GetAllPlansResponse = { data?: WorkoutPlan[]; status: boolean };
export const getAllPlans = createAsyncThunk<GetAllPlansResponse>(
  'get/allPlans',
  async () => {
    try {
      const allPlans = await getItemByKey(
        WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS
      );

      const parsedPlans: WorkoutPlan[] = allPlans
        ? (JSON.parse(allPlans) as WorkoutPlan[])
        : [];

      return { data: parsedPlans, status: true };
    } catch (e) {
      return { status: false };
    }
  }
);
export type AddWorkoutPlanResponse = {
  plans?: WorkoutPlan[];
  status: boolean;
  plan?: WorkoutPlan;
};
export const addWorkoutPlan = createAsyncThunk<AddWorkoutPlanResponse, string>(
  'add/workoutplan',
  async planName => {
    try {
      let updatedList: WorkoutPlan[];
      const plans = await getItemByKey(
        WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS
      );
      const newPlan = { name: planName, routines: [], id: nanoid() };

      if (plans) {
        const parsedData = JSON.parse(plans) as WorkoutPlan[];
        updatedList = [newPlan, ...parsedData];
      } else {
        updatedList = [newPlan];
      }
      await setItemByKey(
        WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS,
        JSON.stringify(updatedList)
      );

      return { plans: updatedList, plan: newPlan, status: true };
    } catch (e) {
      return { status: false };
    }
  }
);

export const addRoutine = createAsyncThunk<
  AddWorkoutPlanResponse & { addedRoutine?: Routine },
  { routine: string; planId: string }
>('add/routine', async ({ routine, planId }) => {
  try {
    let updatedList: WorkoutPlan[] = [];

    const plans = await getItemByKey(WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS);

    const parsedData: WorkoutPlan[] = plans ? await JSON.parse(plans) : [];
    const newRoutine = { name: routine, data: [], id: nanoid() };
    updatedList = parsedData.map(elem =>
      elem.id === planId
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

    return { plans: updatedList, addedRoutine: newRoutine, status: true };
  } catch (e) {
    console.log('create routine', e);
    return { status: false };
  }
});
export const deleteRoutine = createAsyncThunk<
  AddWorkoutPlanResponse,
  { routineId: string; planId: string }
>('delete/routine', async ({ routineId, planId }) => {
  try {
    let updatedList: WorkoutPlan[] = [];

    const plans = await getItemByKey(WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS);

    const parsedData = plans ? (JSON.parse(plans) as WorkoutPlan[]) : [];
    console.log('routineId', routineId);
    updatedList = parsedData.map(elem =>
      elem.id === planId
        ? {
            ...elem,
            routines: elem.routines.filter(
              routineItem => routineItem.id !== routineId
            ),
          }
        : elem
    );

    await setItemByKey(
      WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS,
      JSON.stringify(updatedList)
    );

    return {
      plans: updatedList,
      status: true,
      plan: updatedList.find(el => el.id === planId),
    };
  } catch (e) {
    console.log('create routine', e);
    return { status: false };
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

    const parsedData = plans ? (JSON.parse(plans) as WorkoutPlan[]) : [];

    const plan = parsedData.find(el => el.name === planName);
    if (plan?.routines) {
      newRoutines = plan.routines.map(el =>
        el.id === routineId
          ? {
              ...el,
              data: [
                ...el.data,
                ...exercises.map(el => ({ ...el, routineId: nanoid() })),
              ],
            }
          : el
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
    console.log(selectedPlan);
    return { plans: updatedList, plan: selectedPlan, routineId, status: true };
  } catch (e) {
    console.log(e);
    return { status: false };
  }
});

export const updateExerciseInRoutine = createAsyncThunk<
  AddWorkoutPlanResponse & {
    plan?: WorkoutPlan | undefined;
    routineId?: string;
  },
  { routineId: string; planName: string; exercise: WorkoutExercise }
>('update/exercisesInRoutine', async ({ routineId, planName, exercise }) => {
  try {
    let updatedList: WorkoutPlan[] = [];
    let newRoutines: Routine[];
    let selectedPlan: WorkoutPlan | undefined;
    const plans = await getItemByKey(WORKOUT_ASYNC_STORAGE_KEYS.WORKOUT_PLANS);

    const parsedData = plans ? (JSON.parse(plans) as WorkoutPlan[]) : [];

    const plan = parsedData.find(el => el.name === planName);
    if (plan?.routines) {
      newRoutines = plan.routines.map(el =>
        el.id === routineId
          ? {
              ...el,
              data: [
                ...el.data.map(el => (el.id === exercise.id ? exercise : el)),
              ],
            }
          : el
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

    return { plans: updatedList, plan: selectedPlan, routineId, status: true };
  } catch (e) {
    console.log(e);
    return { status: false };
  }
});
