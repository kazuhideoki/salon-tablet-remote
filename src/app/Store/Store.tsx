import React, { useReducer } from "react";
import { ArticlesAction, articlesReducer } from "./articles/articlesRducer";
import { FooterItemsAction, footerItemsReducer } from "./footerItems/footerItemsReducer";
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

const articleWithoutId = { 
  // id: 0,
  // title: '',
  // date: '',
  // content: '' as any,
  
  is_published: false,
  created_at: '',
  updated_at: '',
  title: '',
  article_content: '',
}
export type ArticleWithoutId = typeof articleWithoutId
const articleId = {
  article_id: 0,
}
export type ArticleId = typeof articleId
export type TArticle = ArticleWithoutId & ArticleId
export type TArticles = TArticle[]

const initFooterItem = {
  footer_items_id: 0,
  is_published: false,
  created_at: '',
  updated_at: '',
  icon_name: '',
  displayed_icon: '',
  on_tap_modal_open: true,
  item_content: '',
  order: 0
}
export type FooterItem = typeof initFooterItem
export type FooterItems = FooterItem[]

const initAppState = {
  isSetting: false,
  setModal: "edit_article",
  isModalOpen: false,
  isArticleModalOpen: false,
  isLoading: false,
};
export type AppState = typeof initAppState

export type DispatchArticles = React.Dispatch<ArticlesAction>;
export type DispatchFooterItems = React.Dispatch<FooterItemsAction>;
export type DispatchAppState = React.Dispatch < AppStateAction >
export type dispatchPaginationParams = React.Dispatch<PaginationParamsAction>;

export type ContextProps = {
  paginationParams: PaginationParams;
  dispatchPaginationParams: dispatchPaginationParams;
  articles: TArticles;
  dispatchArticles: DispatchArticles;
  footerItems: FooterItems
  dispatchFooterItems: DispatchFooterItems
  appState: AppState;
  dispatchAppState: DispatchAppState;
};
const Store = React.createContext({} as ContextProps);

export type StoreContextProviderProps = {
    data: {
        rawData: TArticles
        pagination: PaginationParams
    }
    children?: React.ReactNode
}

const StoreContextProvider = (props: StoreContextProviderProps) => {
  const [paginationParams, dispatchPaginationParams] = useReducer(
    paginationParamsReducer,
    props.data.pagination
  );
  const [articles, dispatchArticles] = useReducer(
    articlesReducer,
    props.data.rawData
  );
  const [footerItems, dispatchFooterItems] = useReducer(
    footerItemsReducer,
    [initFooterItem]
    // とりあえずinitPropsを、あとから↓設定
    // props.data.rawData.footerItems的な
  );
  const [appState, dispatchAppState] = useReducer(
    appStateReducer,
    initAppState
  );

  const values = {
    paginationParams,
    dispatchPaginationParams,
    articles,
    dispatchArticles,
    footerItems,
    dispatchFooterItems,
    appState,
    dispatchAppState,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;