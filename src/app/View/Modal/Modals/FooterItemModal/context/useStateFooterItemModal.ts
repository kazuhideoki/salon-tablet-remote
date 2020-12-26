import React from 'react'
import { Store } from '../../../../../Store/Store';

export const useStateFooterItemModal = () => {
  const { appState } = React.useContext(Store);
  const footerItem = appState.currentModalContent.footerItem;
  return { footerItem };
}