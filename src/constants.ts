import { CustomTheme } from './theme';

export const URL = 'https://pacific-fortress-00744.herokuapp.com/';

export const PATH_TO_SHOW_BOTTOM_BAR: { [key: string]: string } = {
  CurrentWorkout: 'CurrentWorkout',
  Statistics: 'Statistics',
  Profile: 'Profile',
};

export const COLOR_SCHEME = {
  BACKGROUND: CustomTheme.colors.background,
  TAB_BAR: CustomTheme.colors.card,
  MODAL_BACKGROUND: CustomTheme.colors.card,
  WORKOUT_ACTIONS: CustomTheme.colors.primary,
  ANOTHER_ACTIONS: '#DA0AAC',
};

export const WORKOUT_ASYNC_STORAGE_KEYS = {
  WORKOUT: 'currentWorkout',
  WORKOUT_PLANS: 'allPlans',
  IS_DATA_LOADED: 'everythingDownloaded',
  STATISTICS: 'stats',
  WORKOUT_FINISHED: 'finished',
  ERRORS: 'error',
};
