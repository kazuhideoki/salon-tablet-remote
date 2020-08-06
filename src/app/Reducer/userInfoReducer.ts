import {
  TUserInfo,
  T_user_id,
  T_shop_name,
  T_user_name,
  T_user_email,
  T_selected_theme,
} from "../Store/Types";
import { reducerLogger } from "./reducerLogger";

export type TUserInfoAction =
  | {
      type: "GET_USER_INFO";
      payload: {
        user_id: T_user_id;
        user_name: T_user_name;
        shop_name: T_shop_name;
        user_email: T_user_email;
      };
    }
  | {
      type: "SET_THEME";
      payload: {
        selectedTheme: T_selected_theme;
      };
    };


export function userInfoReducer(state: TUserInfo, action: TUserInfoAction) {
  let newState: TUserInfo;
  const func = userInfoReducer;
  switch (action.type) {
    case "GET_USER_INFO":
      newState = { ...state, ...action.payload };
      break;
    case "SET_THEME":
      newState = { ...state, selected_theme: action.payload.selectedTheme  };
      break;

    default:
      console.log("エラーだよ,userInfoReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
