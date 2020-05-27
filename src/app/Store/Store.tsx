import React, { useReducer } from "react";
import { ArticlesAction, articlesReducer } from "../Reducer/articlesRducer";
import { FooterItemsAction, footerItemsReducer } from "../Reducer/footerItemsReducer";
import { AppStateAction, appStateReducer } from "../Reducer/appStateReducer";
import {
  PaginationParamsAction,
  paginationParamsReducer,
} from "../Reducer/paginationParamsReducer";
import { loadingReducer, LoadingAction } from "../Reducer/loadingReducer";
import { userReducer, TUserAction } from "../Reducer/userReducer";


export type T_user_id = number
export type T_user_name = string
export type T_shop_name = string
export type T_email = string
export type T_bcrypt = string // いらないか
export type T_created_at_user = string
export type T_updated_at_user = string
export type T_last_login_at = string

const initUser = {
  user_id: 0,
  user_name: 'user',
  shop_name: 'salon',
  email: 'example@gmail.com',
  bcrypt: '',
  created_at: '',
  updated_at: '',
  last_login_at: '',
}
export type TUser = typeof initUser

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
export type T_article_excerpt = string 
export type T_article_img = string 

export type ArticleWithoutId = {
  is_published: T_is_published_articles
  created_at: T_created_at
  updated_at: T_updated_at
  title: T_title
  article_content: T_article_content
  article_excerpt: T_article_excerpt
  article_img: T_article_img
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
export type T_item_excerpt = string | null;
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
  item_excerpt: T_item_excerpt | null;
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
  ContentModal: '',
  isModalOpen: false,
  isArticleModalOpen: false,
};
export type AppState = typeof initAppState

const initLoading = {
  mainArticles: false,
  modalEditor: false
}
export type Loading = typeof initLoading

export type DispatchUser = React.Dispatch<TUserAction>;
export type DispatchArticles = React.Dispatch<ArticlesAction>;
export type DispatchFooterItems = React.Dispatch<FooterItemsAction>;
export type DispatchAppState = React.Dispatch < AppStateAction >
export type dispatchPaginationParams = React.Dispatch<PaginationParamsAction>;
export type DispatchLoading = React.Dispatch<LoadingAction>;


export type ContextProps = {
  user: TUser
  dispatchUser: DispatchUser
  paginationParams: PaginationParams;
  dispatchPaginationParams: dispatchPaginationParams;
  articles: TArticles;
  dispatchArticles: DispatchArticles;
  footerItems: FooterItems;
  dispatchFooterItems: DispatchFooterItems;
  appState: AppState;
  dispatchAppState: DispatchAppState;
  loading: Loading;
  dispatchLoading: DispatchLoading
};
const Store = React.createContext({} as ContextProps);

export type StoreContextProviderProps = {
  data: {
    articles: TArticles;
    pagination: PaginationParams;
    footerItems: FooterItems;
    // appState: AppState
  };
  children?: React.ReactNode;
};

const StoreContextProvider = (props: StoreContextProviderProps) => {
  const [user, dispatchUser] = useReducer(userReducer, initUser)
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
  const [loading, dispatchLoading] = useReducer(
    loadingReducer,
    initLoading
  );

  const values = {
    user,
    dispatchUser,
    paginationParams,
    dispatchPaginationParams,
    articles,
    dispatchArticles,
    footerItems,
    dispatchFooterItems,
    appState,
    dispatchAppState,
    loading,
    dispatchLoading,
  };

  return <Store.Provider value={values}>{props.children}</Store.Provider>;
};

export { Store, StoreContextProvider };

export default StoreContextProvider;