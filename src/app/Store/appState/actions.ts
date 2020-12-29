import * as types from "./types";
import { TAppState, TSetModal } from "../Types";

export const setModal = (value: TSetModal) => ({ type: types.OPEN_MODAL, payload: value });
export const closeModal = () => ({
         type: types.CLOSE_MODAL,
       });
export const openDrawer = () => ({
         type: types.OPEN_DRAWER,
       });

export type TAppStateAction = 
  ReturnType<typeof setModal>
  | ReturnType<typeof closeModal>
  | ReturnType<typeof openDrawer>
