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

// ●●●●●● テーブル `articles`
export type T_id = number
export type T_is_published_articles = boolean
export type T_created_at = string 
export type T_updated_at = string
export type T_title = string 
export type T_article_content = string 

export type ArticleWithoutId = {
  is_published: T_is_published_articles
  created_at: T_created_at
  updated_at: T_updated_at
  title: T_title
  article_content: T_article_content
}
export type TArticle = {id: T_id} & ArticleWithoutId
export type TArticles = TArticle[]

// ●●●●●● テーブル `footer_items`
export type T_footer_item_id = number;
export type T_is_published_footer_items = boolean;
export type T_created_at_footer_items = string;
export type T_updated_at_footer_items = string | null;
export type T_icon_name = string | null
export type T_displayed_icon_name = string | null;
export type T_on_tap = string;
export type T_item_content = string | null
export type T_link_url = string | null
export type T_order = number;

export type FooterItemWithoutId = {
  is_published: T_is_published_footer_items;
  created_at: T_created_at_footer_items;
  updated_at: T_updated_at_footer_items | null;
  icon_name: T_icon_name | null;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content | null;
  link_url: T_link_url | null;
  order: T_order;
};
export type FooterItem = {
  footer_item_id: T_footer_item_id;
} & FooterItemWithoutId;
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
  data: {
    articles: TArticles;
    pagination: PaginationParams;
    footerItems: FooterItems;
  };
  children?: React.ReactNode;
};

const StoreContextProvider = (props: StoreContextProviderProps) => {
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