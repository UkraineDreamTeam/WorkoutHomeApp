import { useCallback } from 'react';
import { exercises } from '../redux/exercises/exercises.slice';
import { Exercise, Filters } from '../redux/types';
import { useAppSelector } from '../redux/store';

export const useFilter = () => {
  const exerciseList = useAppSelector(exercises);

  const filterExercises: (props: Filters) => Exercise[] = useCallback(
    props => {
      let newArr: Exercise[] = exerciseList.filter(elem => {
        let isFiltered = true;
        if (props) {
          for (const key in props) {
            if (
              !props[key as keyof typeof props]?.includes(
                elem[key as keyof typeof props]
              )
            ) {
              return false;
            }
          }
        }
        return isFiltered;
      });

      return newArr;
    },
    [exerciseList]
  );
  return { filterExercises };
};
