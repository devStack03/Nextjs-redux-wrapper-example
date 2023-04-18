import { createAction } from '@reduxjs/toolkit';

export const runSystem = createAction('status/run');
export const pauseSystem = createAction('status/pause');
export const insufficientBalance = createAction(
  'status/insufficient'
);
