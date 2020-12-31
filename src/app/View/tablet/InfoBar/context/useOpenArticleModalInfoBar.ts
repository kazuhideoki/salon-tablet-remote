import React from 'react'
import { setArticleContent, setModal } from '../../../../Store/appState/actions'
import { AppStateContext } from '../../../../Store/appState/Context'
import { TArticle } from '../../../../Store/Interface'

export const useOpenArticleModalInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)

  return (article: TArticle) => {
    dispatchAppState(setArticleContent(article));
    dispatchAppState(setModal('content_modal'))

  };
}

