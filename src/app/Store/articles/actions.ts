import { TAllArticles, TArticles } from "../Types";
import * as types from "./types";

export const set = (articles: TArticles) => ({
  type: types.SET,
  payload: articles,
});
export const setAll = (allArticles: TAllArticles) => ({
  type: types.SET_ALL,
  payload: allArticles,
});

export type TArticlesAction = ReturnType<typeof set> | ReturnType<typeof setAll>;
