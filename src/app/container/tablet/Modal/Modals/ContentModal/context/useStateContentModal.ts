import React from 'react';
import { AppStateContext } from '../../../../../../store/appState/Context';
export const useStateContentModal = () => {
  const { appState } = React.useContext(AppStateContext);
  const article = appState.currentModalContent.article;
  return { article };
};
