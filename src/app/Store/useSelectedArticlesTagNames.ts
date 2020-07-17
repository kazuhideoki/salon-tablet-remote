import { Store, T_tag_name } from "./Store"
import React from 'react'

export const useSelectedArticlesTagNames = () => {
  const {tags, appState} = React.useContext(Store)


  const tagNames = tags.map((value) => {
    // まず該当タグ名を格納して、該当しないものはnullに
    if (appState.selectedArticlesTags.includes(value.tag_id)) {
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