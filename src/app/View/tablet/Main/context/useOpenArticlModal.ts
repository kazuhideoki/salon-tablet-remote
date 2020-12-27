import React from 'react'
import { ArticleContext } from '../../../../Store/articles/Context'
import { Store } from '../../../../Store/Store'
export const useOpenArticleModal = () => {
  const { dispatchAppState } = React.useContext(Store)
  const { articles } = React.useContext(ArticleContext)

  return (num: number) => {
    dispatchAppState({
      type: "OPEN_ARTICLE_MODAL",
      payload: { num, article: articles[num] },
    });
  };


}