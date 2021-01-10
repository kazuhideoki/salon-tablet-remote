import React from 'react';
import { initAppState, InitAppState } from './initialValue';
import { AppStateAction } from './actions';
import { appStateReducer, AppStateContextState } from './reducer';

export type AppStateContextProps = {
  appState: AppStateContextState;
  dispatchAppState: React.Dispatch<AppStateAction>;
};

export const AppStateContext = React.createContext({} as AppStateContextProps);

export const AppStateContextProvider: React.FC<InitAppState> = (props) => {
  const [state, dispatchAppState] = React.useReducer(
    appStateReducer,
    initAppState(props)
  );

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
