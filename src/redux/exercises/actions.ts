import { createAction } from '@reduxjs/toolkit';
import { Filter, FilterNames } from '../types';

export const increment = createAction('counter/increment');
export const total = createAction<number>('total');
export const equipment = createAction<Filter[]>('equipment');
export const targets = createAction<Filter[]>('targets');
export const types = createAction<Filter[]>('setTypes');
export const bodyParts = createAction<Filter[]>('setBodyParts');
export const filter = createAction<{
  name: FilterNames;
  filterItem: Filter;
}>('filter/exercises');
