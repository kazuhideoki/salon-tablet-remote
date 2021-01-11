import React from 'react';
import {
  setArticleContent,
  setModal,
} from '../../../../stores/appState/actions';
import { AppStateContext } from '../../../../stores/appState/Context';
import { ArticlesContext } from '../../../../stores/articles/Context';

export const useOpenArticleModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { articles } = React.useContext(ArticlesContext);

  return (num: number) => {
    dispatchAppState(setArticleContent(articles[num]));
    dispatchAppState(setModal('content_modal'));
  };
};
