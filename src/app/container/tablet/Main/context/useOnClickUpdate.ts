import React from 'react'
import { setModal, updateArticle } from '../../../../Store/appState/actions';
import { AppStateContext } from '../../../../Store/appState/Context';
import { TArticle } from "../../../../Store/Interface";

export const useOnClickUpdate = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  return (article: TArticle) => {

    dispatchAppState(updateArticle(article));
    dispatchAppState(setModal('edit_article'))
  }
}