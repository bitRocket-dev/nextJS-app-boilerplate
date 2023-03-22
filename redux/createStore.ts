import { configureStore } from "@reduxjs/toolkit";
import { sliceGeneral } from "./general/slice";

export const createStore = () => {
  const store = configureStore({
    reducer: {
      general: sliceGeneral.reducer,
    },
  });
  return store;
};

export const store = createStore();

export type TStore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
