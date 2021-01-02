import React from 'react';
import { initAppState, TInitAppState } from './initialValue';
import { TAppStateAction } from './actions';
import { appStateReducer, AppStateContextState } from './reducer';

export type AppStateContextProps = {
  appState: AppStateContextState;
  dispatchAppState: React.Dispatch<TAppStateAction>;
};

export const AppStateContext = React.createContext({} as AppStateContextProps);

export const AppStateContextProvider: React.FC<TInitAppState> = (props) => {
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
