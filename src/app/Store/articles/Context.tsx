import React from "react";
import { TAllArticles, TArticles, TPaginationParams } from "../Types";
import { TArticlesAction } from "./actions";
import { articlesReducer, ArticleContextState } from "./reducer";

export type ArticlesContextProps = ArticleContextState & {
  dispatchArticles: React.Dispatch<TArticlesAction>;
};
export const ArticleContext = React.createContext({} as ArticlesContextProps);

export type Props = ArticleContextState;

export const ArticlesContextProvider: React.FC<Props> = (
         props
       ) => {
         const [state, dispatchArticles] = React.useReducer(
           articlesReducer,
           props
         );

         const values: ArticlesContextProps = {
           articles: state.articles,
           allArticles: state.allArticles,
           paginationParams: state.paginationParams,
           dispatchArticles,
         };

         return (
           <ArticleContext.Provider value={values}>{props.children}</ArticleContext.Provider>
         );
       };

