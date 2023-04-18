import { createReducer } from '@reduxjs/toolkit';
import { loggedIn, loggedOut } from './actions';


export type AuthState = {
  loggedin: boolean;
  userId: string | null;
};

const initialState: AuthState = {
  loggedin: true,
  userId: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loggedIn, (state, action) => {
      state.loggedin = true;
      state.userId = action.payload;
    })
    .addCase(loggedOut, (state) => {
      state.loggedin = false;
      state.userId = null;
    })
});