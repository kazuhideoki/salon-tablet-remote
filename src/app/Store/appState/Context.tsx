import React from "react";
import { initAppState } from "../Types";
import { TAppStateAction } from "./actions";
import { appStateReducer, AppStateContextState } from "./reducer";

export type Props = {
  isPublicPage: boolean;
  device: string;
  samplePage: string;
};

export type AppStateContextProps = {
  appState: AppStateContextState;
  dispatchAppState: React.Dispatch<TAppStateAction>;
};

export const AppStateContext = React.createContext({} as AppStateContextProps);

export const AppStateContextProvider: React.FC<Props> = (props) => {
  const [state, dispatchAppState] = React.useReducer(appStateReducer, initAppState(props));

  const values: AppStateContextProps = {
    appState: state,
    dispatchAppState,
  };

  return (
    <AppStateContext.Provider value={values}>
      {props.children}
    </AppStateContext.Provider>
  );
};
