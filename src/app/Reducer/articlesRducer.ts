import { TArticles, TArticle } from "../Store/Types";
import { reducerLogger } from "./reducerLogger";

export type ArticlesAction =
  | { type: "GET"; payload: TArticles }
  | { type: "CREATE_POST"; payload: TArticle }
  | { type: "UPDATE_POST"; payload: TArticle }
  | { type: "DELETE_POST"; payload: { id: number } };

export function articlesReducer(state: TArticles, action: ArticlesAction) {
    let newState: TArticles;
    const func = articlesReducer;
    switch (action.type) { 
    case "GET":
        newState = action.payload;
        break;
    case "CREATE_POST":
        const arr = [...state, action.payload];
        newState = arr.concat();
        break;
    case "UPDATE_POST":
        newState = state.map((value, index) => {
        if (value.article_id === action.payload.article_id) {
          return action.payload;
        } else {
          return value;
        }
        })
        break;
    case "DELETE_POST":
        newState = state.filter((value, index) =>{
            return value.article_id !== action.payload.id;
        })
        break;

    default:
        console.log("エラーだよ, ArticlesReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action });
    return newState;
}

