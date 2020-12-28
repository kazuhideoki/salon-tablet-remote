import { reducerLogger } from "../../Reducer/reducerLogger";
import { TInstagramAccounts } from "../Types";
import { TInstagramAccountsAction } from "./actions";
import * as types from "./types";

export type InstagramAccountsContextState = TInstagramAccounts;

export const instagramAccountsReducer = (
  state: InstagramAccountsContextState,
  action: TInstagramAccountsAction
) => {
  let newState: InstagramAccountsContextState;
  const func = instagramAccountsReducer;
  switch (action.type) {

    case types.SET:
      newState = action.payload;
      break;

    case types.SET_RECONNECT:
      const instagramAccounts = state.map((value) => {
        if (value.instagram_id === action.payload) {
          value.is_reconnect_needed = true
        }
        return value;
      });
      newState = instagramAccounts
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
