import React from 'react'
import { Store } from '../../Store/Store'

export const AllTags = () => {
  const { tags } = React.useContext(Store)

  return (
    <div>
      tagの一覧表示です
      {tags.map((value) => {
        return <p>{value.tag_name}</p>
      })}
    </div>
  )
}
