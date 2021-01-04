import { reducerLogger } from '../../../lib/dev/reducerLogger';
import { TAllArticles, TArticles, TPaginationParams } from '../Interface';
import { TArticlesAction } from './actions';
import * as types from './types';

export type ArticlesContextState = {
  articles: TArticles;
  allArticles: TAllArticles;
  paginationParams: TPaginationParams;
};

export const articlesReducer = (
  state: ArticlesContextState,
  action: TArticlesAction
) => {
  let newState: ArticlesContextState;
  const func = articlesReducer;
  switch (action.type) {
    case types.SET:
      newState = {
        articles: action.payload.articles,
        allArticles: action.payload.allArticles,
        paginationParams: action.payload.pagination,
      };
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
