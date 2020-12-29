import React from 'react'
import { AppStateContext } from '../../../../Store/appState/Context'
import { ArticlesContext } from '../../../../Store/articles/Context'
export const useOpenArticleModal = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { articles } = React.useContext(ArticlesContext)

  return (num: number) => {
    dispatchAppState({
      type: "OPEN_ARTICLE_MODAL",
      payload: { num, article: articles[num] },
    });
  };


}