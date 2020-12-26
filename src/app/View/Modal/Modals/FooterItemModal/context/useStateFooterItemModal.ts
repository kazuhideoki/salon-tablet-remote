import React from 'react'

export const useStateFooterItemModal = () => {
  const { appState } = React.useContext(Store);
  const footerItem = appState.currentModalContent.footerItem;
  return { footerItem };
}