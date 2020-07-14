import React from 'react'
import { Store } from '../../Store/Store'
import { Chip } from '@material-ui/core'
import { useDeleteTag } from "../../ActionCreator/tags/useDeleteTag";

type Props = {
  // trueで編集用、falseで選択用
  edittable: boolean
  handleOnEditting?: (TagId: number, tagName: string) => void
}

export const AllTags = ({ edittable, handleOnEditting}: Props) => {
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
        return (
          <Chip
            label={value.tag_name}
            onClick={edittable ? () => handleOnEditting(value.tag_id, value.tag_name) : null}
            onDelete={edittable ? () => handleDelete(value.tag_id) : null}
          />
        )
      })}
    </div>
  )
}
