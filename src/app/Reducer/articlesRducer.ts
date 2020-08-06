import { TArticles, TArticle } from "../Store/Types";
import { reducerLogger } from "./reducerLogger";

export type ArticlesAction =
  | { type: "GET_ARTICLES"; payload: TArticles }

export function articlesReducer(state: TArticles, action: ArticlesAction) {
    let newState: TArticles;
    const func = articlesReducer;
    switch (action.type) {
      case "GET_ARTICLES":
        newState = action.payload;
        break;

      default:
        console.log("エラーだよ, ArticlesReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action });
    return newState;
}

