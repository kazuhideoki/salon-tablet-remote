import React from 'react';
import {
  setModal,
  updateFooterItem,
} from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
import { FooterItem } from '../../../../../../util/interface/Interface';

export const useHandleOnUpdateFooterItem = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (footerItem: FooterItem) => {
    dispatchAppState(updateFooterItem(footerItem));
    dispatchAppState(setModal('edit_footer_item'));
  };
};
