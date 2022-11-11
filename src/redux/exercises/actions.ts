import { createAction } from '@reduxjs/toolkit';

export const increment = createAction('counter/increment');
export const total = createAction<number>('total');
export const equipment = createAction<Filter[]>('equipment');
export const targets = createAction<Filter[]>('targets');
export const types = createAction<Filter[]>('setTypes');
export const bodyParts = createAction<Filter[]>('setBodyParts');
