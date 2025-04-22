import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./homepageSlice";

import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
 

export const store = configureStore({
  reducer: {
    HomepageReducer: homepageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
