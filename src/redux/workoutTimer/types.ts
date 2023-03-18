import { WorkoutForm } from 'redux/workoutForm/types';

export type WorkoutItemInProgress = WorkoutForm & {
  isCompleted: boolean;
  isSkipped: boolean;
};

export type State = {
  isRest: boolean;
  timer: number;
  duration: number;
  setsArray: { [key: string]: WorkoutItemInProgress[] };
  currentSet: string;
  setId: string;
};
