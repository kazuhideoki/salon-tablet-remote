import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { FooterItemsContext } from '../../../../../Store/footerItems/Context';
import { FooterItem, T_footer_item_id } from '../../../../../Store/Types';

export const useStateFooter = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { loading, isSetting } = appState;
  const { footerItems } = React.useContext(FooterItemsContext);

  const openFooterItemModal = (footer_item_id: T_footer_item_id) =>
    dispatchAppState({
      type: "OPEN_FOOTER_ITEM_MODAL",
      payload: {footerItemId: footer_item_id, footerItems},
    });

  return {
    footerItems,
    loading,
    isSetting,
    openFooterItemModal,
  };
}