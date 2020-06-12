import { TUserInfo } from "../Store/Store";
import { reducerLogger } from "./reducerLogger";

export type TUserInfoAction = { type: "SET_USER_DATA"; payload: TUserInfo };


export function userInfoReducer(state: TUserInfo, action: TUserInfoAction) {
  let newState: TUserInfo;
  const func = userInfoReducer;
  switch (action.type) {
    case "SET_USER_DATA":
      newState = action.payload
      break;

    default:
      console.log("エラーだよ,userInfoReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
