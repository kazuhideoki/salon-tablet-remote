import React from 'react';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { FooterItemsContext } from '../../../../../stores/footerItems/Context';

export const useStateFooter = () => {
  const { appState } = React.useContext(AppStateContext);
  const { loading, isSetting } = appState;
  const { footerItems } = React.useContext(FooterItemsContext);

  return {
    footerItems,
    loading,
    isSetting,
  };
};
