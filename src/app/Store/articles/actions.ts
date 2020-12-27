import { TArticles } from "../Types";
import * as types from "./types";

export const set = (articles: TArticles) => ({
  type: types.SET,
  payload: articles,
})


export type TArticlesAction = ReturnType<typeof set>