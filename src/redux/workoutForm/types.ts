export type Time = { seconds: string; minutes: string };
export type WorkoutForm = {
  setRestTime: Time;
  setRestTimeMS: number;
  sets: number;
  reps: number;
  duration: Time;
  durationMS: number;
  weigth?: string;
};
