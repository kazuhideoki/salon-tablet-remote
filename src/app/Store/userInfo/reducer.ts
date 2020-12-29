import { reducerLogger } from "../../Reducer/reducerLogger";
import { TUserInfo, T_theme_font } from "../Types";
import { TUserInfoAction } from "./actions";
import * as types from "./types";

export type UserInfoContextState = TUserInfo;

export const userInfoReducer = (
  state: UserInfoContextState,
  action: TUserInfoAction
) => {
  let newState: UserInfoContextState;
  const func = userInfoReducer;
  switch (action.type) {
    case types.UPDATE:
      newState = { ...state, ...action.payload }
      break;
    case types.SET_THEME:
      newState = {
            ...state,
            selected_theme: action.payload.selected_theme,
            theme_color: action.payload.theme_color,
            theme_font1: action.payload.theme_font1,
            theme_font2: action.payload.theme_font2,
            theme_font_heading: action.payload.theme_font_heading,
          }
      break;
    case types.SET_THEME_COLOR:
      newState = {
        ...state,
        theme_color: action.payload
      }
      break;
    case types.SET_THEME_FONT1:
      newState = {
        ...state,
        theme_font1: action.payload,
      }
      break;
    case types.SET_THEME_FONT2:
      newState = {
        ...state,
        theme_font2: action.payload,
      };
      break;
    case types.SET_THEME_FONT_HEADING:
      newState = {
        ...state,
        theme_font_heading: action.payload,
      };
      break;
    case types.SET_FOOTER_ICON_SIZE:
      newState = {
        ...state,
        footer_icon_size: action.payload,
      };
      break;
    case types.SET_SHOW_ARTICLE_TYPE:
      newState = {
        ...state,
        show_article_type: action.payload,
      };
      break;
    case types.SET_IS_GENERATE_PUBLIC_PAGE:
      newState = {
        ...state,
        is_generate_public_page: action.payload,
      };
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
