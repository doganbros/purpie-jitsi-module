import { AnyAction, configureStore } from "@reduxjs/toolkit";
import meetingReducer from "./meeting";
import {
  ReactReduxContextValue,
  createDispatchHook,
  createSelectorHook,
} from "react-redux";
import { createContext } from "react";

export const store = configureStore({
  reducer: {
    meeting: meetingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const jitsiStoreContext = createContext(
  {} as ReactReduxContextValue<any, AnyAction>
);
export const moduleStoreContext = createContext(
  {} as ReactReduxContextValue<RootState, AnyAction>
);

export const useModuleDispatch = createDispatchHook(moduleStoreContext);
export const useModuleSelector = createSelectorHook(moduleStoreContext);

export const useJitsiDispatch = createDispatchHook(jitsiStoreContext);
export const useJitsiSelector = createSelectorHook(jitsiStoreContext);
