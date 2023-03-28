/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosClient } from '../../common/utils/createAxiosClient';

export const thunkGeneral = createAsyncThunk<unknown, unknown>('GENERAL', async (payload, thunkAPI) => {
  try {
    await AxiosClient().get('....');
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
