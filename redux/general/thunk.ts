import { createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosClient } from "../../utils/createAxiosClient";

export const thunkGeneral = createAsyncThunk<{}, {}>(
  "GENERAL",
  async (payload, thunkAPI) => {
    try {
      await AxiosClient().get("....");
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
