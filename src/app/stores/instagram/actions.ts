import * as types from './types';
import {
  InstagramAccounts,
  InstagramMediaObject,
} from '../../../util/interface/Interface';

export const setAccounts = (instagramAccounts: InstagramAccounts) => ({
  type: types.SET_ACCOUNTS,
  payload: instagramAccounts,
});

export const setReconnect = (instagram_id: number) => ({
  type: types.SET_RECONNECT,
  payload: instagram_id,
});
export const setMedias = (instagramMediaObject: InstagramMediaObject) => ({
  type: types.SET_MEDIAS,
  payload: instagramMediaObject,
});
export const removeMedias = () => ({
  type: types.REMOVE_MEDIAS,
});

export type InstagramAction =
  | ReturnType<typeof setAccounts>
  | ReturnType<typeof setReconnect>
  | ReturnType<typeof setMedias>
  | ReturnType<typeof removeMedias>;
