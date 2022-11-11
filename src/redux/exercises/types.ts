export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  type: 'stretch' | 'exercise';
};

export type Filter = {
  value: string;
  selected: boolean;
  isSelectable: boolean;
};
export type Filters = {
  bodyPart?: Filter[];
  type?: Filter[];
  target?: Filter[];
  equipment?: Filter[];
};
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
};
