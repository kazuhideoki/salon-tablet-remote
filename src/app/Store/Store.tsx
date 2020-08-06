import React, { useReducer } from "react";
import { AppStateAction, appStateReducer } from "../Reducer/appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "../Reducer/paginationParamsReducer";
import { loadingReducer, LoadingAction } from "../Reducer/loadingReducer";
import { IndexProps } from "../../pages";

import {
  Loading,
  PaginationParams,
  AppState,
  initAppState,
  initLoading,
} from "./Types";

export type ContextProps = {
  paginationParams: PaginationParams;
  dispatchPaginationParams: React.Dispatch<PaginationParamsAction>;
  appState: AppState;
  dispatchAppState: React.Dispatch<AppStateAction>;
  loading: Loading;
  dispatchLoading: React.Dispatch<LoadingAction>;
};
const Store = React.createContext({} as ContextProps);

const StoreContextProvider: React.FC<IndexProps> = (props) => {
  const [paginationParams, dispatchPaginationParams] = useReducer(
    paginationParamsReducer,
    props.data.pagination
  );

  const [appState, dispatchAppState] = useReducer(appStateReducer, initAppState(props.data));
  const [loading, dispatchLoading] = useReducer(loadingReducer, initLoading);

  const values = {
    paginationParams,
    dispatchPaginationParams,
    appState,
    dispatchAppState,
    loading,
    dispatchLoading,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;