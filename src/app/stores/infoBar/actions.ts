import * as types from './types';
import { InfoBarData } from '../../../util/interface/Interface';

export const set = (infoBar: InfoBarData) => ({
  type: types.SET,
  payload: infoBar,
});

export type InfoBarAction = ReturnType<typeof set>;
