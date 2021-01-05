import { ApiArticlesGetReturn } from '../../../pages/api/articles/get';
import { TAllArticles, Articles } from '../../../util/interface/Interface';
import * as types from './types';

export const set = (data: ApiArticlesGetReturn) => ({
  type: types.SET,
  payload: data,
});

export type ArticlesAction = ReturnType<typeof set>;
