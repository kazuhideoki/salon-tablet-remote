import * as types from './types';
import { TTags } from '../../../util/interface/Interface';

export const set = (tags: TTags) => ({
  type: types.SET,
  payload: tags,
});

export type TTagsAction = ReturnType<typeof set>;
