import React from "react";
import { TArticles } from "../Types";
import { TArticlesAction } from "./actions";
import { articlesReducer } from "./reducer";

export type ArticlesContextProps = {
  articlesState: TArticles;
  dispatchArticlesState: React.Dispatch<TArticlesAction>;
};
export const ArticleContext = React.createContext({} as ArticlesContextProps);

export type ArticlesContextProvider = { articles: TArticles}

export const ArticlesContextProvider: React.FC<ArticlesContextProvider> = (
         props
       ) => {
         const [articlesState, dispatchArticlesState] = React.useReducer(
           articlesReducer,
           props.articles
         );

         const values: ArticlesContextProps = {
           articlesState,
           dispatchArticlesState,
         };

         return (
           <ArticleContext.Provider value={values}>{props.children}</ArticleContext.Provider>
         );
       };

