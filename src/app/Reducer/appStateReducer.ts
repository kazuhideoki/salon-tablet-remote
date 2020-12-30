import {
  TAppState, initInstagramMedias,
} from "../Store/Types";
import { reducerLogger } from "./reducerLogger";
import { AppStateAction } from "./AppStateAction";

export function appStateReducer(state: TAppState, action: AppStateAction) {
    let newState: TAppState;
    const func = appStateReducer
    switch (action.type) {

      case "SET_ARTICLES":
        const isShowInstagram =
          action.payload.showArticles === true ? false : state.isShowInstagram;
        newState = {
          ...state,
          selectedArticlesTags: action.payload.selectedArticlesTags,
          isSetting: action.payload.isSetting,
          isShowInstagram: isShowInstagram,
        };
        break;

      case "SET_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          isShowInstagram: true,
          selectedInstagramAccount: action.payload.selectedInstagramAccount,
          selectedArticlesTags: [],
        };
        break;
      case "DELETE_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          isShowInstagram: false,
        };
        break;

      default:
        console.log("エラー,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
