import React from 'react'
import { Store } from '../../../../../../Store/Store';
export const useStateInstagramMediaModal = () => {
  const { appState } = React.useContext(Store);
  const instagramMedia = appState.currentModalContent.instagramMedia;

  return { instagramMedia }
}