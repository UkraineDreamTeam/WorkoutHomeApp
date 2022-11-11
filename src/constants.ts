import Edit from './assets/icons/Edit.svg';
import Reorder from './assets/icons/Reorder.svg';
import Rename from './assets/icons/Rename.svg';
import Delete from './assets/icons/Delete.svg';

export const URL = 'https://pacific-fortress-00744.herokuapp.com';
export const COLLECTION_KEY = 'Exercises';
export const PATH_TO_SHOW_BOTTOM_BAR: { [key: string]: string } = {
  CurrentWorkout: 'CurrentWorkout',
  Statistics: 'Statistics',
  Profile: 'Profile',
};

export const WORKOUT_ASYNC_STORAGE_KEYS = {
  WORKOUT: 'currentWorkout',
  WORKOUT_PLANS: 'allPlans',
  IS_DATA_LOADED: 'everythingDownloaded',
  STATISTICS: 'stats',
  WORKOUT_FINISHED: 'finished',
  ERRORS: 'error',
};

export const ASYNC_STORAGE_KEYS = {
  DATA: 'uploaded',
};
export type ROUTINE_ACTION_TYPE =
  | 'editSuperset'
  | 'reorder'
  | 'rename'
  | 'delete';

export const ROUTINE_EDIT_ACTIONS = {
  editSuperset: 'Edit Superset',
  reorder: 'Reorder exercises',
  rename: 'Rename routine',
  delete: 'Delete routine',
};
export const ROUTINE_ACTIONS = Object.keys(
  ROUTINE_EDIT_ACTIONS
) as ROUTINE_ACTION_TYPE[];
export const ROUTINE_EDIT_SVGS = {
  editSuperset: Edit,
  reorder: Reorder,
  rename: Rename,
  delete: Delete,
};
