import { ImageSourcePropType } from 'react-native';

export const ICONS_PATHS: { [key: string]: ImageSourcePropType | undefined } = {
  Home: require('./assets/icons/Home.png'),
  Profile: require('./assets/icons/Profile.png'),
  Statistics: require('./assets/icons/Statistics.png'),
};
export const PATH_TO_SHOW_BOTTOM_BAR: { [key: string]: string } = {
  CurrentWorkout: 'CurrentWorkout',
  Statistics: 'Statistics',

  Profile: 'Profile',
};
