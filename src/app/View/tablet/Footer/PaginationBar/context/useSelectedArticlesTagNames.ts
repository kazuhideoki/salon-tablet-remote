import { Store } from "../../../../../Store/Store";
import React from 'react'

// 現在main画面で表示している記事の,タグの名前を配列で返す
export const useSelectedArticlesTagNames = () => {
  const {appState} = React.useContext(Store)
  const selectedArticlesTags = appState.selectedArticlesTags

  const tagNames = appState.tags.map((value) => {
    // まず該当タグ名を格納して、該当しないものはnullに
    if (selectedArticlesTags.includes(value.tag_id)) {
      return value.tag_name
    }
    return null
  })

  const targetTagNames = tagNames.filter((value) => {
    // null をはじく
    return value
  })

  return targetTagNames;
}