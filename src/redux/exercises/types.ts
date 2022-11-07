export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  type: 'stretch' | 'exercise';
};

export type Filter = { [key: string]: string };

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
  loading: boolean;
  error: string;
  exercisesLoaded: number;
  totalExercisesCount: number;
  targets: string[];
  bodyParts: string[];
  equipment: string[];
  types: string[];
};
