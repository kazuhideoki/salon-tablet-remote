import { reducerLogger } from '../../../util/dev/reducerLogger';
import { InfoBar, InfoBarData } from '../../../util/interface/Interface';
import { InfoBarAction } from './actions';
import * as types from './types';

export type InfoBarContextState = InfoBarData;

export const infoBarReducer = (
  state: InfoBarContextState,
  action: InfoBarAction
): InfoBarContextState => {
  let newState: InfoBarContextState;
  const func = infoBarReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload;
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
