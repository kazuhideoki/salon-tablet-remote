import { reducerLogger } from "./reducerLogger";
import { TInstagramAccounts } from "../Store/Types";

export type InstagramAccountsAction = { type: "GET_INSTAGRAM_ACCOUNTS"; payload: TInstagramAccounts };

export function instagramAccountsReducer(state: TInstagramAccounts, action: InstagramAccountsAction) {
  let newState: TInstagramAccounts;
  const func = instagramAccountsReducer;
  switch (action.type) {
    case "GET_INSTAGRAM_ACCOUNTS":
      newState = action.payload;
      break;

    default:
      console.log("エラーだよ,instagramAccountsReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
