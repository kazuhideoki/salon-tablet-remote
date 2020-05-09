import React, { useReducer } from "react";
import { ArticlesAction, articlesReducer } from "./articles/articlesRducer";
import { FooterItemsAction, footerItemsReducer } from "./footerItems/footerItemsReducer";
import { AppStateAction, appStateReducer } from "./appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "./paginationParams/paginationParamsReducer";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

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
  id: 0,
}
export type ArticleId = typeof articleId
export type TArticle = ArticleWithoutId & ArticleId
export type TArticles = TArticle[]

const initFooterItemWithoutId = {
  is_published: false,
  created_at: '',
  updated_at: '',
  icon_name: '',
  displayed_icon: '',
  on_tap_modal_open: true,
  item_content: '',
  link_url: '',
  order: 0
}
export type FooterItemWithoutId = {
  is_published: boolean;
  created_at: string;
  updated_at: string | null;
  icon_name: string;
  displayed_icon: string;
  on_tap_modal_open: boolean;
  item_content: string;
  link_url: string;
  order: number;
};
export const footerItemId = {
  footer_items_id: 0,
};
export type FooterItemId = typeof footerItemId;
export type FooterItem = FooterItemWithoutId & FooterItemId;
export type FooterItems = FooterItem[]

const initAppState = {
  isSetting: false,
  setModal: "edit_article",
  footerItemContent: '',
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
    data: [
      {
        rawData: TArticles
        pagination: PaginationParams
      },
      { rawData: FooterItems }
    ]
    children?: React.ReactNode
}

const StoreContextProvider = (props: StoreContextProviderProps) => {
  const [paginationParams, dispatchPaginationParams] = useReducer(
    paginationParamsReducer,
    props.data[0].pagination
  );
  const [articles, dispatchArticles] = useReducer(
    articlesReducer,
    props.data[0].rawData
  );
  const [footerItems, dispatchFooterItems] = useReducer(
    footerItemsReducer,
    props.data[1].rawData
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