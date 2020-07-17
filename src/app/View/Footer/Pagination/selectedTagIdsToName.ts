import React from "react";
import { Store } from "../../../Store/Store"
import { tagsReducer } from "../../../Reducer/tagsReducer"

export const selectedTagIdsToName = (tagId: number) => {
  const {tags} = React.useContext(Store)

  const targetTag = tags.filter((value) => {
    return value.tag_id === tagId
  })

  const tagName = targetTag[0].tag_name

  return tagName
}