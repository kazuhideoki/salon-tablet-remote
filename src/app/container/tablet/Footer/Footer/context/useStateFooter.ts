import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { FooterItemsContext } from '../../../../../Store/footerItems/Context';

export const useStateFooter = () => {
  const { appState } = React.useContext(AppStateContext);
  const { loading, isSetting } = appState;
  const { footerItems } = React.useContext(FooterItemsContext);

  return {
    footerItems,
    loading,
    isSetting,
  };
}