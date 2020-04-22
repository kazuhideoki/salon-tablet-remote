import React, { useReducer, useState } from "react";
import { PostDataAction, postDataReducer } from "./postDataRducer";
import { AppStateAction, appStateReducer } from "./appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "./paginationParamsReducer";

const initPagination = {
    currentPage: 0,
    pageCount: 0,
    pageSize: 0,
    rawCount: 0,
}
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
//   totalPages: number;
//   setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  postData: PostData;
  dispatchPostData: DidpatchPostData;
  appState: AppState;
  dispatchAppState: DispatchAppState;
};
const Store = React.createContext({} as ContextProps);

const StoreContextProvider = (props) => {
    const [paginationParams, dispatchPaginationParams] = useReducer(
      paginationParamsReducer,
      initPagination
    );
    // const [totalPages, setTotalPages] = React.useState(0)
    const [postData, dispatchPostData] = useReducer(postDataReducer, props.data);
    const [appState, dispatchAppState] = useReducer(appStateReducer, initAppState);

    const values = {
        paginationParams,
        dispatchPaginationParams,
        // totalPages,
        // setTotalPages,
        postData,
        dispatchPostData,
        appState,
        dispatchAppState,
    };

    return (
      <Store.Provider value={ values }>
            {props.children}
      </Store.Provider>
    );

}

export { Store, StoreContextProvider };
