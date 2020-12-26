import React from 'react'
import { Store } from '../../../../../Store/Store';
export const useStateContentModal = () => {
  const { appState } = React.useContext(Store);
  const article = appState.currentModalContent.article;
  return { article }
}