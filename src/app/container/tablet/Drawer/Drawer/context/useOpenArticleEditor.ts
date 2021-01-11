import React from 'react';
import {
  createArticle,
  setModal,
} from '../../../../../stores/appState/actions';
import { AppStateContext } from '../../../../../stores/appState/Context';
export const useOpenArticleEditor = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return () => {
    dispatchAppState(createArticle());
    dispatchAppState(setModal('edit_article'));
  };
};
