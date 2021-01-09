import React from 'react';
import {
  setFooterItemContent,
  setModal,
} from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
import { FooterItem } from '../../../../../../util/interface/Interface';

export const useOpenFooterItemModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (footerItem: FooterItem) => {
    dispatchAppState(setFooterItemContent(footerItem));
    if (footerItem.on_tap === 'modal') {
      dispatchAppState(setModal('footer_item_modal'));
    } else if (footerItem.on_tap === 'google') {
      dispatchAppState(setModal('google_search'));
    }
  };
};
