import { reducerLogger } from "../../Reducer/reducerLogger";
import { TAllArticles, TArticles, TPaginationParams } from "../Types";
import { TArticlesAction } from "./actions";
import * as types from './types'

export type ArticleContextState = { articles: TArticles, allArticles: TAllArticles, paginationParams: TPaginationParams}

export const articlesReducer = (
         state: ArticleContextState,
         action: TArticlesAction
       ) => {
         let newState: ArticleContextState;
         const func = articlesReducer;
         switch (action.type) {
           case types.SET:
             newState = {
               articles: action.payload.rawData,
               allArticles: action.payload.allArticles,
               paginationParams: action.payload.pagination
              };
             break;
         }

         reducerLogger({ state, newState, func, action });
         return newState;
       };