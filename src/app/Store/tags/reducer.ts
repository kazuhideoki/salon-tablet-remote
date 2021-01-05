import { reducerLogger } from '../../../util/dev/reducerLogger';
import { Tags } from '../../../util/interface/Interface';
import { TagsAction } from './actions';
import * as types from './types';

export type TagsContextState = Tags;

export const tagsReducer = (state: TagsContextState, action: TagsAction) => {
  let newState: TagsContextState;
  const func = tagsReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload;
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
