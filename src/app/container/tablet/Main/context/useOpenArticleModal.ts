import React from 'react';
import {
  setArticleContent,
  setModal,
} from '../../../../store/appState/actions';
import { AppStateContext } from '../../../../store/appState/Context';
import { ArticlesContext } from '../../../../store/articles/Context';

export const useOpenArticleModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { articles } = React.useContext(ArticlesContext);

  return (num: number) => {
    dispatchAppState(setArticleContent(articles[num]));
    dispatchAppState(setModal('content_modal'));
  };
};
