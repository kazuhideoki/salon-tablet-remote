import React from 'react'
import { Store } from '../../Store/Store'
import { Chip } from '@material-ui/core'
import { useDeleteTag } from "../../ActionCreator/tags/useDeleteTag";

type Props = {
  edittable: boolean
}

export const AllTags = ({edittable}: Props) => {
  const { tags } = React.useContext(Store)
  const deleteTag = useDeleteTag()

  const handleDelete = (tag_id) => {
    const deleting = confirm("本当に削除してよろしいですか？");
    deleting ? deleteTag(tag_id) : null
  }

  return (
    <div>
      tagの一覧表示です
      {tags.map((value) => {
        return <Chip label={value.tag_name} onDelete={edittable ? () => handleDelete(value.tag_id) : null}/>
      })}
    </div>
  )
}
