import React from 'react'
import { setFooterItemContent, setModal } from '../../../../../Store/appState/actions';
import { AppStateContext } from '../../../../../Store/appState/Context';
import { FooterItem } from "../../../../../Store/Types";

export const useOpenFooterItemModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (footerItem: FooterItem) => {
    dispatchAppState(setFooterItemContent(footerItem));
    if (footerItem.on_tap === 'modal') {
      dispatchAppState(setModal("footer_item_modal"));
    } else if (footerItem.on_tap === 'google') {
      dispatchAppState(setModal("google_search"));
    }
  }
}