import * as types from "./types";
import { TInstagramAccounts, T_instagram_id, T_is_reconnect_needed } from "../Types";

export const set = (instagramAccounts: TInstagramAccounts) => ({
         type: types.SET,
         payload: instagramAccounts,
       });

export type TSetReconnect = {
  
  is_reconnect_needed: T_is_reconnect_needed;
};
export const setReconnect = (instagram_id: T_instagram_id) => ({
         type: types.SET_RECONNECT,
         payload: instagram_id
       });

export type TInstagramAccountsAction =
  | ReturnType<typeof set>
  | ReturnType<typeof setReconnect>;
