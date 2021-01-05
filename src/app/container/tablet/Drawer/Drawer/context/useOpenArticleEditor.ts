import React from 'react';
import { createArticle, setModal } from '../../../../../store/appState/actions';
import { AppStateContext } from '../../../../../store/appState/Context';
export const useOpenArticleEditor = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState(createArticle());
    dispatchAppState(setModal('edit_article'));
  };
};
