import React from 'react'
import { AppStateContext } from '../../../../../Store/appState/Context';
import { TagsContext } from "../../../../../Store/tags/Context";

// 現在main画面で表示している記事の,タグの名前を配列で返す
export const useSelectedArticlesTagNames = () => {
  const {appState} = React.useContext(AppStateContext)
  const { tags } = React.useContext(TagsContext);
  const selectedArticlesTags = appState.selectedArticlesTags

  const tagNames = tags.map((value) => {
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