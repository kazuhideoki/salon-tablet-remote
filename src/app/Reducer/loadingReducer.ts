import { Loading } from "../Store/Types";
import { reducerLogger } from "./reducerLogger";

export type LoadingAction =
  | { type: "ON_IS_LOADING_MAIN_ARTICLES" }
  | { type: "OFF_IS_LOADING_MAIN_ARTICLES" }
  | { type: "ON_IS_LOADING_MODAL_EDITOR" }
  | { type: "OFF_IS_LOADING_MODAL_EDITOR" };

export function loadingReducer(state: Loading, action: LoadingAction) {
  let newState: Loading;
  const func = loadingReducer;
  switch (action.type) {
    case "ON_IS_LOADING_MAIN_ARTICLES":
      newState = {
        ...state,
        mainArticles: true,
      };
      break;
    case "OFF_IS_LOADING_MAIN_ARTICLES":
      newState = {
        ...state,
        mainArticles: false,
      };
      break;
    case "ON_IS_LOADING_MODAL_EDITOR":
      newState = {
        ...state,
        modalEditor: true,
      };
      break;
    case "OFF_IS_LOADING_MODAL_EDITOR":
      newState = {
        ...state,
        modalEditor: false,
      };
      break;

    default:
      console.log("エラーだよ,loadingReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
