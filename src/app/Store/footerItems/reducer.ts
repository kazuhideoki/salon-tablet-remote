import { reducerLogger } from '../../../util/dev/reducerLogger';
import { FooterItems } from '../../../util/interface/Interface';
import { FooterItemsAction } from './actions';
import * as types from './types';

export type FooterItemsContextState = FooterItems;

export const footerItemsReducer = (
  state: FooterItemsContextState,
  action: FooterItemsAction
) => {
  let newState: FooterItemsContextState;
  const func = footerItemsReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload;
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
