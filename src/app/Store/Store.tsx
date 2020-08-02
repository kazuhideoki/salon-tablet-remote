import React, { useReducer } from "react";
import { ArticlesAction, articlesReducer } from "../Reducer/articlesRducer";
import { FooterItemsAction, footerItemsReducer } from "../Reducer/footerItemsReducer";
import { AppStateAction, appStateReducer } from "../Reducer/appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "../Reducer/paginationParamsReducer";
import { loadingReducer, LoadingAction } from "../Reducer/loadingReducer";
import { userInfoReducer, TUserInfoAction } from "../Reducer/userInfoReducer";
import { tagsReducer, TagsAction } from "../Reducer/tagsReducer";
import { IndexProps } from "../../pages";
import {
  instagramAccountsReducer,
  InstagramAccountsAction,
} from "../Reducer/instagramAccountsReducer";
import {
  TUserInfo,
  Loading,
  PaginationParams,
  TArticles,
  FooterItems,
  TTags,
  AppState,
  TInstagramAccounts,
  initAppState,
  initLoading,
  TInstagramMedias,
} from "./Types";
import { instagramMediasReducer, InstagramMediasAction } from "../Reducer/instagramMediasReducer";

export type ContextProps = {
  userInfo: TUserInfo;
  dispatchUserInfo: React.Dispatch<TUserInfoAction>;
  paginationParams: PaginationParams;
  dispatchPaginationParams: React.Dispatch<PaginationParamsAction>;
  articles: TArticles;
  dispatchArticles: React.Dispatch<ArticlesAction>;
  footerItems: FooterItems;
  dispatchFooterItems: React.Dispatch<FooterItemsAction>;
  tags: TTags;
  dispatchTags: React.Dispatch<TagsAction>;
  instagramAccounts: TInstagramAccounts;
  dispatchInstagramAccounts: React.Dispatch<InstagramAccountsAction>;
  instagramMedias: TInstagramMedias;
  dispatchInstagramMedias: React.Dispatch<InstagramMediasAction>;
  appState: AppState;
  dispatchAppState: React.Dispatch<AppStateAction>;
  loading: Loading;
  dispatchLoading: React.Dispatch<LoadingAction>;
};
const Store = React.createContext({} as ContextProps);

const StoreContextProvider: React.FC<IndexProps> = (props) => {
  const [userInfo, dispatchUserInfo] = useReducer(
    userInfoReducer,
    props.data.session
  );
  const [paginationParams, dispatchPaginationParams] = useReducer(
    paginationParamsReducer,
    props.data.pagination
  );
  const [articles, dispatchArticles] = useReducer(
    articlesReducer,
    props.data.articles
  );
  const [footerItems, dispatchFooterItems] = useReducer(
    footerItemsReducer,
    props.data.footerItems
  );
  const [tags, dispatchTags] = useReducer(tagsReducer, props.data.tags)

  const [instagramAccounts, dispatchInstagramAccounts] = useReducer(
    instagramAccountsReducer,
    props.data.instagramAccounts
  );
  const [instagramMedias, dispatchInstagramMedias] = useReducer(
    instagramMediasReducer,
    props.data.instagramMedias
  );

  const [appState, dispatchAppState] = useReducer(
    appStateReducer,
    initAppState
  );
  const [loading, dispatchLoading] = useReducer(loadingReducer, initLoading);

  const values = {
    userInfo,
    dispatchUserInfo,
    paginationParams,
    dispatchPaginationParams,
    articles,
    dispatchArticles,
    footerItems,
    dispatchFooterItems,
    tags,
    dispatchTags,
    instagramAccounts,
    dispatchInstagramAccounts,
    instagramMedias,
    dispatchInstagramMedias,
    appState,
    dispatchAppState,
    loading,
    dispatchLoading,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;