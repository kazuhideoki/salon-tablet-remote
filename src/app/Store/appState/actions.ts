import * as types from "./types";
import { TAppState } from "../Types";

export const set = (appState: TAppState) => ({
         type: types.SET,
         payload: appState,
       });

export type TAppStateAction = ReturnType<typeof set>;
