import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { ExercisesState, Filter, FilterNames, Filters } from './types';

type FilterAction = (
  state: WritableDraft<ExercisesState>,
  {
    payload: { name, filterItem },
  }: PayloadAction<{
    name: keyof Filters;
    filterItem: Filter;
  }>
) => void;

export const filterExercises: FilterAction = (
  state,
  { payload: { name, filterItem } }
) => {
  if (filterItem.selected) {
    state.selectedFilters[name] = state.selectedFilters[name].map(el =>
      el.value === filterItem.value ? { ...el, selected: false } : el
    );
  } else {
    state.selectedFilters[name] = state.selectedFilters[name].map(el =>
      el.value === filterItem.value
        ? { ...el, selected: true }
        : { ...el, selected: false }
    );
  }

  const activeFilters: string[][] = [];
  for (const key in state.selectedFilters) {
    const selected = state.selectedFilters[key as FilterNames].find(
      el => el.selected
    );

    if (selected) {
      activeFilters.push([key as FilterNames, selected.value]);
    }
  }
  if (activeFilters.length) {
    state.temporaryFiltered = state.filteredExercises.filter(el =>
      activeFilters.every(elem => el[elem[0] as keyof typeof el] === elem[1])
    );
  } else {
    state.temporaryFiltered = state.filteredExercises;
  }

  for (const key in state.selectedFilters) {
    state.selectedFilters[key as FilterNames] = state.selectedFilters[
      key as FilterNames
    ].map(el => ({
      ...el,
      isSelectable: Boolean(
        state.temporaryFiltered?.some(
          elem => elem[key as keyof typeof elem] === el.value
        )
      ),
    }));
  }
};
