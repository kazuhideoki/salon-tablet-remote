import { reducerLogger } from "../../Reducer/reducerLogger";
import { initInstagramMedias, TInstagramAccounts, TInstagramMedias } from "../Types";
import { TInstagramAction } from "./actions";
import * as types from "./types";

export type InstagramContextState = {
  instagramAccounts: TInstagramAccounts;
  instagramMedias: TInstagramMedias;
};

export const instagramReducer = (
  state: InstagramContextState,
  action: TInstagramAction
) => {
  let newState: InstagramContextState;
  const func = instagramReducer;
  switch (action.type) {

    case types.SET_ACCOUNTS:
      newState = {
        ...state,
        instagramAccounts: action.payload
      };
      break;

    case types.SET_RECONNECT:
      const instagramAccounts = state.instagramAccounts.map((value) => {
        if (value.instagram_id === action.payload) {
          value.is_reconnect_needed = true
        }
        return value;
      });
      newState = {
        ...state,
        instagramAccounts: instagramAccounts
      }
      break;
    case types.SET_MEDIAS:
      newState = {
        ...state,
        instagramMedias: action.payload,
      }
      break;
    case types.REMOVE_MEDIAS:
      newState = {
        ...state,
        instagramMedias: initInstagramMedias,
      }
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
