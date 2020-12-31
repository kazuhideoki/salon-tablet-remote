import { T_articles_get_return } from "../../../pages/api/articles/get";
import { TAllArticles, TArticles } from "../Interface";
import * as types from "./types";

export const set = (data: T_articles_get_return) => ({
  type: types.SET,
  payload: data,
});

export type TArticlesAction = ReturnType<typeof set>
