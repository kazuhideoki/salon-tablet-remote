import * as types from "./types";
import { TAppState, TSetModal } from "../Types";

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

export type TAppStateAction =
  | ReturnType<typeof setModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof openDrawer>
  | ReturnType<typeof closeDrawer>
  | ReturnType<typeof isLoadingMain>
