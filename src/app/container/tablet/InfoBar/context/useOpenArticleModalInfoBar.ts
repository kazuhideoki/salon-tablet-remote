import React from 'react';
import {
  setArticleContent,
  setModal,
} from '../../../../store/appState/actions';
import { AppStateContext } from '../../../../store/appState/Context';
import { TArticle } from '../../../../store/Interface';

export const useOpenArticleModalInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (article: TArticle) => {
    dispatchAppState(setArticleContent(article));
    dispatchAppState(setModal('content_modal'));
  };
};
