/** @format */

import { createSlice } from '@reduxjs/toolkit';

import { thunkGeneral } from './thunk';

interface State {
  isLoading?: true;
  text?: string;
}

export const sliceGeneral = createSlice<State, {}>({
  name: 'general',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunkGeneral.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(thunkGeneral.rejected, state => {
      delete state.isLoading;
    });
    builder.addCase(thunkGeneral.fulfilled, state => {
      state.text = 'test';
    });
  },
});
