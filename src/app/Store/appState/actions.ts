import * as types from "./types";
import { FooterItem, FooterItems, TAppState, TArticle, TInstagramMedia, TSetModal } from "../Types";
import { TFooterItemEdittingParams } from "../../ActionCreator/footerItems/useCreateFooterItem";

export const setModal = (value: TSetModal) => ({ type: types.OPEN_MODAL, payload: value });
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
          payload: value
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
export const setArticleContent = (value: TArticle) => ({
         type: types.SET_ARTICLE_CONTENT,
         payload: value,
       });
export const setFooterItemContent = (value: FooterItem) => ({
         type: types.SET_FOOTER_ITEM_CONTENT,
         payload: value,
       });
export const setInstagramMediaContent = (value: TInstagramMedia) => ({
         type: types.SET_INSTAGRAM_MEDIA_CONTENT,
         payload: value,
       });
export const createArticle = () => ({
         type: types.CREATE_ARTICLE,
       });
export const updateArticle = (article: TArticle) => ({
         type: types.UPDATE_ARTICLE,
         payload: article
       });

export const setModalSize = (value: {
         footerItemEdittingParams: TFooterItemEdittingParams;
         footerItems: FooterItems;
       }) => ({
         type: types.SET_MODAL_SIZE,
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
  
  | ReturnType<typeof setModalSize>
