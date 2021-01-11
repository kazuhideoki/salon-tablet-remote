import React from 'react';
import {
  setModal,
  updateFooterItem,
} from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { FooterItem } from '../../../../../../util/interface/Interface';

export const useHandleOnUpdateFooterItem = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (footerItem: FooterItem) => {
    dispatchAppState(updateFooterItem(footerItem));
    dispatchAppState(setModal('edit_footer_item'));
  };
};
