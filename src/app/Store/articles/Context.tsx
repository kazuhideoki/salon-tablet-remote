import React from "react";
import { TArticles } from "../Types";
import { TArticlesAction } from "./actions";
import { articlesReducer } from "./reducer";

export type ArticlesContextProps = {
  articles: TArticles;
  dispatchArticles: React.Dispatch<TArticlesAction>;
};
export const ArticleContext = React.createContext({} as ArticlesContextProps);

export type ArticlesContextProvider = { articles: TArticles}

export const ArticlesContextProvider: React.FC<ArticlesContextProvider> = (
         props
       ) => {
         const [articles, dispatchArticles] = React.useReducer(
           articlesReducer,
           props.articles
         );

         const values: ArticlesContextProps = {
           articles,
           dispatchArticles,
         };

         return (
           <ArticleContext.Provider value={values}>{props.children}</ArticleContext.Provider>
         );
       };

