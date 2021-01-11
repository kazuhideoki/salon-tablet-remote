import React from 'react';
import { AppStateContext } from '../../../../../../stores/appState/Context';
export const useStateInstagramMediaModal = () => {
  const { appState } = React.useContext(AppStateContext);
  const instagramMedia = appState.currentModalContent.instagramMedia;

  return { instagramMedia };
};
