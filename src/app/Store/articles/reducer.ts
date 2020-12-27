import { reducerLogger } from "../../Reducer/reducerLogger";
import { TAllArticles, TArticles } from "../Types";
import { TArticlesAction } from "./actions";
import * as types from './types'

export type ArticleContextState = { articles: TArticles, allArticles: TAllArticles}

export const articlesReducer = (
         state: ArticleContextState,
         action: TArticlesAction
       ) => {
         let newState: ArticleContextState;
         const func = articlesReducer;
         switch (action.type) {
           case types.SET:
             newState = {
               ...state,
               articles: action.payload
              };
             break;
           case types.SET_ALL:
             newState = {
               ...state,
               allArticles: action.payload,
             };
             break;
         }

         reducerLogger({ state, newState, func, action });
         return newState;
       };