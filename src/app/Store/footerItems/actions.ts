import * as types from './types';
import { FooterItems } from '../../../util/interface/Interface';

export const set = (footerItems: FooterItems) => ({
  type: types.SET,
  payload: footerItems,
});

export type TFooterItemsAction = ReturnType<typeof set>;
