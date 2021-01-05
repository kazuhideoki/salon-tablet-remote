import React from 'react'
import { createArticle, setModal } from '../../../../../Store/appState/actions';
import { AppStateContext } from '../../../../../Store/appState/Context';
export const useOpenArticleEditor = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)

  return () => {
    dispatchAppState(createArticle());
    dispatchAppState(setModal('edit_article'));

  }
}