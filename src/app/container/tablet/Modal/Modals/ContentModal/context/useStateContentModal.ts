import React from 'react';
import { AppStateContext } from '../../../../../../stores/appState/Context';
export const useStateContentModal = () => {
  const { appState } = React.useContext(AppStateContext);
  const article = appState.currentModalContent.article;
  return { article };
};
