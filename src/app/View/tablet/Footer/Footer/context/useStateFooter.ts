import React from 'react'
import { FooterItemsContext } from '../../../../../Store/footerItems/Context';
import { Store } from '../../../../../Store/Store';
import { FooterItem, T_footer_item_id } from '../../../../../Store/Types';

export const useStateFooter = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { loading, isSetting } = appState;
  const { footerItems } = React.useContext(FooterItemsContext);

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
      payload: {footerItemId: footer_item_id, footerItems},
    });

  return {
    footerItems,
    loading,
    isSetting,
    handleOnUpDateFooterIcon,
    openFooterItemModal,
  };
}