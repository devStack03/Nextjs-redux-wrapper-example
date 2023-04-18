import { createAction } from '@reduxjs/toolkit';

export const loggedIn = createAction<string | undefined>('auth/loggedin');
export const loggedOut = createAction('auth/loggedout');
