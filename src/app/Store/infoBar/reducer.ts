import { reducerLogger } from '../../../util/dev/reducerLogger';
import { TInfoBar, TInfoBarData } from '../Interface';
import { TInfoBarAction } from './actions';
import * as types from './types';

export type InfoBarContextState = TInfoBarData;

export const infoBarReducer = (
  state: InfoBarContextState,
  action: TInfoBarAction
) => {
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
