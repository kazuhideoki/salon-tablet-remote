import React from 'react'
import { ArticlesContext } from '../../../../Store/articles/Context'
import { Store } from '../../../../Store/Store'
export const useOpenArticleModal = () => {
  const { dispatchAppState } = React.useContext(Store)
  const { articles } = React.useContext(ArticlesContext)

  return (num: number) => {
    dispatchAppState({
      type: "OPEN_ARTICLE_MODAL",
      payload: { num, article: articles[num] },
    });
  };


}