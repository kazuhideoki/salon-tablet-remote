import React from 'react';
import { setModal, updateArticle } from '../../../../store/appState/actions';
import { AppStateContext } from '../../../../store/appState/Context';
import { TArticle } from '../../../../../util/interface/Interface';

export const useOnClickUpdate = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  return (article: TArticle) => {
    dispatchAppState(updateArticle(article));
    dispatchAppState(setModal('edit_article'));
  };
};
