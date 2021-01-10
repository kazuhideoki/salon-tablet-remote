import React from 'react';
import { setModal, updateArticle } from '../../../../stores/appState/actions';
import { AppStateContext } from '../../../../stores/appState/Context';
import { Article } from '../../../../../util/interface/Interface';

export const useOnClickUpdate = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  return (article: Article) => {
    dispatchAppState(updateArticle(article));
    dispatchAppState(setModal('edit_article'));
  };
};
