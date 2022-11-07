import { createAction } from '@reduxjs/toolkit';

export const increment = createAction('counter/increment');
export const total = createAction<number>('total');
export const equipment = createAction<string[]>('equipment');
export const targets = createAction<string[]>('targets');
export const types = createAction<string[]>('setTypes');
export const bodyParts = createAction<string[]>('setBodyParts');
