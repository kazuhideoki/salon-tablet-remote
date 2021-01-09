import React from 'react';
import {
  setArticleContent,
  setModal,
} from '../../../../store/appState/actions';
import { AppStateContext } from '../../../../store/appState/Context';
import { Article } from '../../../../../util/interface/Interface';

export const useOpenArticleModalInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);

  return (article: Article) => {
    dispatchAppState(setArticleContent(article));
    dispatchAppState(setModal('content_modal'));
  };
};
