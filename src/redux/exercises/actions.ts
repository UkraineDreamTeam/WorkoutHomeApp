import { createAction } from '@reduxjs/toolkit';

export const increment = createAction('counter/increment');
export const total = createAction<number>('total');
