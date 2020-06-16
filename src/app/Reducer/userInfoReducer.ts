import {
  TUserInfo,
  T_user_id,
  T_shop_name,
  T_user_name,
  T_user_email,
} from "../Store/Store";
import { reducerLogger } from "./reducerLogger";
import { TUpdateUserInfo } from "../ActionCreator/user/useUpdateUser";

export type TUserInfoAction = {
  type: "SET_USER_INFO";
  payload: {
    user_id: T_user_id;
    user_name: T_user_name;
    shop_name: T_shop_name;
    user_email: T_user_email;
  };
};


export function userInfoReducer(state: TUserInfo, action: TUserInfoAction) {
  let newState: TUserInfo;
  const func = userInfoReducer;
  switch (action.type) {
    case "SET_USER_INFO":
      newState = {...state, ...action.payload}
      break;

    default:
      console.log("エラーだよ,userInfoReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
