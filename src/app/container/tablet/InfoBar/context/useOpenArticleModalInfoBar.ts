import React from 'react';
import {
  setArticleContent,
  setModal,
} from '../../../../stores/appState/actions';
import { AppStateContext } from '../../../../stores/appState/Context';
import { Article } from '../../../../../util/interface/Interface';

export const useOpenArticleModalInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (article: Article) => {
    dispatchAppState(setArticleContent(article));
    dispatchAppState(setModal('content_modal'));
  };
};
