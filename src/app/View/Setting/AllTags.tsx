import React from 'react'
import { Store } from '../../Store/Store'
import { Chip } from '@material-ui/core'

export const AllTags = () => {
  const { tags } = React.useContext(Store)

  return (
    <div>
      tagの一覧表示です
      {tags.map((value) => {
        return <Chip label={value.tag_name}/>
      })}
    </div>
  )
}
