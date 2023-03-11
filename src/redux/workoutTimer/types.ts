import { WorkoutForm } from 'redux/workoutForm/types';

export type WorkoutItemInProgress = WorkoutForm & {
  isCompleted: boolean;
  isSkipped: boolean;
};
