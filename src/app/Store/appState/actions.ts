import * as types from './types';
import {
  FooterItem,
  FooterItems,
  Article,
  InstagramMedia,
  SetModal,
} from '../../../util/interface/Interface';
import { TFooterItemEdittingParams } from '../../hooks/footerItems/useCreateFooterItem';
import { T_articles_get_return } from '../../../pages/api/articles/get';

export const setModal = (value: SetModal) => ({
  type: types.OPEN_MODAL,
  payload: value,
});
export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});
export const openDrawer = () => ({
  type: types.OPEN_DRAWER,
});
export const closeDrawer = () => ({
  type: types.CLOSE_DRAWER,
});
export const isLoadingMain = (value: boolean) => ({
  type: types.IS_LOADING_MAIN,
  payload: value,
});
export const isLoadingFooter = (value: boolean) => ({
  type: types.IS_LOADING_FOOTER,
  payload: value,
});
export const isLoadingTags = (value: boolean) => ({
  type: types.IS_LOADING_TAGS,
  payload: value,
});
export const isLoadingInstagramAccounts = (value: boolean) => ({
  type: types.IS_LOADING_INSTAGRAM_ACCOUNTS,
  payload: value,
});
export const setArticleContent = (value: Article) => ({
  type: types.SET_ARTICLE_CONTENT,
  payload: value,
});
export const setFooterItemContent = (value: FooterItem) => ({
  type: types.SET_FOOTER_ITEM_CONTENT,
  payload: value,
});
export const setInstagramMediaContent = (value: InstagramMedia) => ({
  type: types.SET_INSTAGRAM_MEDIA_CONTENT,
  payload: value,
});
export const createArticle = () => ({
  type: types.CREATE_ARTICLE,
});
export const updateArticle = (value: Article) => ({
  type: types.UPDATE_ARTICLE,
  payload: value,
});
export const createFooterItem = () => ({
  type: types.CREATE_FOOTER_ITEM,
});
export const updateFooterItem = (value: FooterItem) => ({
  type: types.UPDATE_FOOTER_ITEM,
  payload: value,
});

export const setModalSize = (value: {
  footerItemEdittingParams: TFooterItemEdittingParams;
  footerItems: FooterItems;
}) => ({
  type: types.SET_MODAL_SIZE,
  payload: value,
});
export const setSelectedInstagramAccounts = (value: {
  id: number;
  username: string;
}) => ({
  type: types.SET_SELECTED_INSTAGRAM_ACCOUNTS,
  payload: value,
});
export const isShowInstagram = (value: boolean) => ({
  type: types.IS_SHOW_INSTAGRAM,
  payload: value,
});

export const setArticlesAppState = (value: {
  data: T_articles_get_return;
  selectedArticlesTags: number[];
  isSetting: boolean;
  showArticles: boolean;
}) => ({
  type: types.SET_ARTICLES_APP_STATE,
  payload: value,
});

export type TAppStateAction =
  | ReturnType<typeof setModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof openDrawer>
  | ReturnType<typeof closeDrawer>
  | ReturnType<typeof isLoadingMain>
  | ReturnType<typeof isLoadingFooter>
  | ReturnType<typeof isLoadingTags>
  | ReturnType<typeof isLoadingInstagramAccounts>
  | ReturnType<typeof setArticleContent>
  | ReturnType<typeof setFooterItemContent>
  | ReturnType<typeof setInstagramMediaContent>
  | ReturnType<typeof createArticle>
  | ReturnType<typeof updateArticle>
  | ReturnType<typeof createFooterItem>
  | ReturnType<typeof updateFooterItem>
  | ReturnType<typeof setModalSize>
  | ReturnType<typeof setSelectedInstagramAccounts>
  | ReturnType<typeof isShowInstagram>
  | ReturnType<typeof setArticlesAppState>;
