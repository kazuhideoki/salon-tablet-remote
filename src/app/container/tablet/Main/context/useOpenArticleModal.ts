import React from 'react'
import { setArticleContent, setModal } from '../../../../Store/appState/actions'
import { AppStateContext } from '../../../../Store/appState/Context'
import { ArticlesContext } from '../../../../Store/articles/Context'

export const useOpenArticleModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { articles } = React.useContext(ArticlesContext)

  return (num: number) => {
    dispatchAppState(setArticleContent(articles[num]));
    dispatchAppState(setModal('content_modal'))

  };


}