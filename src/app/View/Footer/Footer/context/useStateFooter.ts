import React from 'react'
import { Store } from '../../../../Store/Store';
import { FooterItem, T_footer_item_id } from '../../../../Store/Types';

export const useStateFooter = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { footerItems, loading, isSetting } = appState;

  const handleOnUpDateFooterIcon = (footerItem: FooterItem) => {
    dispatchAppState({
      type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT",
      payload: footerItem,
    });
    dispatchAppState({
      type: "OPEN_MODAL",
      payload: "edit_footer_item",
    });
  };

  const openFooterItemModal = (footer_item_id: T_footer_item_id) =>
    dispatchAppState({
      type: "OPEN_FOOTER_ITEM_MODAL",
      payload: footer_item_id,
    });

  return {
    footerItems,
    loading,
    isSetting,
    handleOnUpDateFooterIcon,
    openFooterItemModal,
  };
}