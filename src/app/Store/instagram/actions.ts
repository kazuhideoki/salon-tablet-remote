import * as types from './types';
import {
  initInstagramMedias,
  TInstagramAccounts,
  TInstagramMedias,
  T_instagram_id,
  T_is_reconnect_needed,
} from '../../../util/interface/Interface';

export const setAccounts = (instagramAccounts: TInstagramAccounts) => ({
  type: types.SET_ACCOUNTS,
  payload: instagramAccounts,
});

export type TSetReconnect = {
  is_reconnect_needed: T_is_reconnect_needed;
};
export const setReconnect = (instagram_id: T_instagram_id) => ({
  type: types.SET_RECONNECT,
  payload: instagram_id,
});
export const setMedias = (instagramMedias: TInstagramMedias) => ({
  type: types.SET_MEDIAS,
  payload: instagramMedias,
});
export const removeMedias = () => ({
  type: types.REMOVE_MEDIAS,
});

export type TInstagramAction =
  | ReturnType<typeof setAccounts>
  | ReturnType<typeof setReconnect>
  | ReturnType<typeof setMedias>
  | ReturnType<typeof removeMedias>;
