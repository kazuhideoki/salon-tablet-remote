import * as types from './types';
import { Tags } from '../../../util/interface/Interface';

export const set = (tags: Tags) => ({
  type: types.SET,
  payload: tags,
});

export type TagsAction = ReturnType<typeof set>;
