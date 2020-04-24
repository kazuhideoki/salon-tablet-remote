import React, { useReducer } from "react";
import { PostDataAction, postDataReducer } from "./postData/postDataRducer";
import { AppStateAction, appStateReducer } from "./appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "./paginationParams/paginationParamsReducer";

const initPagination = {
  page: 0,
  pageCount: 0,
  pageSize: 0,
  rowCount: 0,
};
export type PaginationParams = typeof initPagination;

const postDataSingle = { 
    id: 0,
    title: '',
    date: '',
    content: '' as any,
}
export type PostDataSingle = typeof postDataSingle;
export type PostData = PostDataSingle[]

const initAppState = {
    isSetting: false,
    setModal: "magazines",
    isModalOpen: false,
    isArticleModalOpen: false,
    isLoading: false,
};
export type AppState = typeof initAppState

export type DidpatchPostData = React.Dispatch<PostDataAction>;
export type DispatchAppState = React.Dispatch < AppStateAction >
export type dispatchPaginationParams = React.Dispatch<PaginationParamsAction>;

export type ContextProps = {
  paginationParams: PaginationParams;
  dispatchPaginationParams: dispatchPaginationParams;
  postData: PostData;
  dispatchPostData: DidpatchPostData;
  appState: AppState;
  dispatchAppState: DispatchAppState;
};
const Store = React.createContext({} as ContextProps);

export type StoreContextProviderProps = {
    data: {
        rawData: PostData
        pagination: PaginationParams
    }
    children?: React.ReactNode
}

const StoreContextProvider = (props: StoreContextProviderProps) => {
  const [paginationParams, dispatchPaginationParams] = useReducer(
    paginationParamsReducer,
    props.data.pagination
  );
  const [postData, dispatchPostData] = useReducer(
    postDataReducer,
    props.data.rawData
  );
  const [appState, dispatchAppState] = useReducer(
    appStateReducer,
    initAppState
  );

  const values = {
    paginationParams,
    dispatchPaginationParams,
    postData,
    dispatchPostData,
    appState,
    dispatchAppState,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;