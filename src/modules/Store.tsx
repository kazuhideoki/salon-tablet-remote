import React, { useReducer, useState } from "react";
import { WpParamsAction, wpParamsReducer } from "./wpParamsReducer";
import { PostDataAction, postDataReducer } from "./postDataRducer";
import { WpDataAction, wpDataReducer } from "./wpDataReducer";
import { AppStateAction, appStateReducer } from "./appStateReducer";

const initParams: WpParams = {
    currentPage: 1,
    categories: 24,
    author: '',
    tag: '',
    isJa: false,
};
export type WpParams = {
    currentPage: number,
    categories: number,
    author: number | string | null,
    tag: number | string | null,
    isJa: boolean,
}



const postDataSingle = { 
    id: 0,
    title: '',
    date: '',
    content: '',
}
export type PostDataSingle = typeof postDataSingle;
export type PostData = PostDataSingle[]

const initWpData: WpData = {
    articles: [],
    articlesImportantEn: [],
    articlesImportantJa: [],
    articleModal: [],
    tags: [],
    users: []
};
export type WpData = {
    articles: any[],
    articlesImportantEn: any[]
    articlesImportantJa: any[]
    articleModal: any[],
    tags: any[],
    users: any[]
};

const initAppState = {
    setModal: 'magazines',
    isModalOpen: false,
    isArticleModalOpen: false,
    isLoading: false,
}
export type AppState = typeof initAppState

export type DidpatchPostData = React.Dispatch<PostDataAction>;
export type DispatchWpParams = React.Dispatch<WpParamsAction>
export type DispatchWpData = React.Dispatch < WpDataAction >
export type DispatchAppState = React.Dispatch < AppStateAction >
export type SetTotalPages = React.Dispatch < React.SetStateAction < number >>

export type ContextProps = {
  postData: PostData;
  dispatchPostData: DidpatchPostData;
  wpParams: WpParams;
  dispatchWpParams: DispatchWpParams;
  wpData: WpData;
  dispatchWpData: DispatchWpData;
  appState: AppState;
  dispatchAppState: DispatchAppState;
  totalPages: number;
  setTotalPages: SetTotalPages;
};
const Store = React.createContext({} as ContextProps);

type Props = { 
    data: PostData
}

const StoreContextProvider: React.FC<Props> = (props) => {
    const [postData, dispatchPostData] = useReducer(postDataReducer, props.data);
    const [wpParams, dispatchWpParams] = useReducer(wpParamsReducer, initParams);
    const [wpData, dispatchWpData] = useReducer(wpDataReducer, initWpData);
    const [appState, dispatchAppState] = useReducer(appStateReducer, initAppState);
    // トータルページ数を取得、paginationに利用
    const [totalPages, setTotalPages] = useState(1)

    const values = {
        postData,
        dispatchPostData,
        wpParams,
        dispatchWpParams, 
        wpData,
        dispatchWpData,
        appState,
        dispatchAppState,
        totalPages,
        setTotalPages,
    };

    return (
      <Store.Provider value={ values }>
            {props.children}
      </Store.Provider>
    );

}

export { Store, StoreContextProvider };
