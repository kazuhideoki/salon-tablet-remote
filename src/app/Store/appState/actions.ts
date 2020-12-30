import * as types from "./types";
import { TAppState, TArticle, TSetModal } from "../Types";

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
