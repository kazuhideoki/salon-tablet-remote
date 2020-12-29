import { reducerLogger } from "../../Reducer/reducerLogger";
import { TAppState } from "../Types";
import { TAppStateAction } from "./actions";
import * as types from "./types";

export type AppStateContextState = TAppState;

export const appStateReducer = (
  state: AppStateContextState,
  action: TAppStateAction
) => {
  let newState: AppStateContextState;
  const func = appStateReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
