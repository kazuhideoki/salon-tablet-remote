import { reducerLogger } from '../../../util/dev/reducerLogger';
import {
  TAllArticles,
  Articles,
  PaginationParams,
} from '../../../util/interface/Interface';
import { ArticlesAction } from './actions';
import * as types from './types';

export type ArticlesContextState = {
  articles: Articles;
  allArticles: TAllArticles;
  paginationParams: PaginationParams;
};

export const articlesReducer = (
  state: ArticlesContextState,
  action: ArticlesAction
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
