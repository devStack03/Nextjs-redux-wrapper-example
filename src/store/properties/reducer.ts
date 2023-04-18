import { createReducer } from '@reduxjs/toolkit';
import { addToListedProperties } from './actions';

export type ListedPropertiesState = {
  data: any[];
};

const initialState: ListedPropertiesState = {
  data: [],
};

export const listedPropertiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToListedProperties, (state, action) => {
      const { data } = state;
      data.push(action.payload)
      state.data = [...data];
    })
});