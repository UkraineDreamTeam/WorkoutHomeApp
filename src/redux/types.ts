import {WorkoutForm} from "redux/workoutForm/types";

export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  type: 'stretch' | 'exercise';
  extraImages?: string[];
};
export type ExerciseConfig = {
  sets?: WorkoutForm[];
  routineId?: string;
};

export type WorkoutExercise = Exercise & ExerciseConfig;
export type Filter = {
  value: string;
  selected: boolean;
  isSelectable: boolean;
};
export type Filters = {
  bodyPart: Filter[];
  type: Filter[];
  target: Filter[];
  equipment: Filter[];
};
export type FilterNames = keyof Filters;
export type ReadDirResponse = {
  isDirectory: null;
  isFile: null;
  fileName: string;
  uri: string;
  mtime: string | undefined;
  ctime: Date | undefined;
  name: string;
  path: string;
  size: number;
};
export type Routine = { name: string; data: WorkoutExercise[]; id: string };
export type WorkoutPlan = {
  name: string;
  routines: Routine[];
  id: string;
};
export type ExercisesState = {
  exercises: Exercise[];
  filteredExercises: Exercise[];
  loading: boolean;
  error: string;
  exercisesLoaded: number;
  totalExercisesCount: number;
  targets: Filter[];
  bodyParts: Filter[];
  equipment: Filter[];
  types: Filter[];
  selectedFilters: Filters;
  modalVisible: boolean;
  temporaryFiltered?: Exercise[];
  workoutPlans?: WorkoutPlan[];
  selectedWorkoutPlan: WorkoutPlan | undefined;
  selectedRoutine?: Routine;
  isReordering: boolean
};
