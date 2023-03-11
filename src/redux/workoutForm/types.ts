export type Time = { seconds: string; minutes: string };
export type WorkoutForm = {
  id: string;
  setRestTime: Time;
  setRestTimeMS: number;
  sets: number;
  reps: number;
  duration: Time;
  durationMS: number;
  weight: number;
};
