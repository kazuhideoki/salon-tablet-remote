import React from 'react'
import { AllTags } from './AllTags'
import { TextField, Button } from '@material-ui/core'
import { useCreateTag } from '../../ActionCreator/tags/useCreateTag'
import { useUpdateTag } from '../../ActionCreator/tags/useUpdateTag'

export const ManageTags = () => {
  const [tagNameField, setTagNameField] = React.useState('')
  const [isEditting, setIsEditting] = React.useState(false)
  const [edittingTagId, setEditingTagId] = React.useState(0)
  const [edittingTagName, setEditingTagName] = React.useState('')
  const createTag = useCreateTag()
  const updateTag = useUpdateTag()

  const handleOnEditting = (TagId: number, tagName: string) => {
    setIsEditting(true)
    setEditingTagId(TagId)
    setTagNameField(tagName)
    setEditingTagName(tagName)
  }

  const handleOnCreateNew = () => {
    setIsEditting(false)
    setTagNameField('')
  }

  const handleOnClick = () => {
    console.log("ManageTagsのhandleOnClickだよ");
    if (isEditting) {
      updateTag({edittingTagId, tagName: tagNameField})
    } else {
      createTag(tagNameField)
    }
  }

  return (
    <div>
      <h2>タグの管理を行います。新規追加したり、修正したり</h2>
      <p>{isEditting ? <>{edittingTagName + "を編集中"}<Button onClick={() => handleOnCreateNew()}>新規作成</Button></>: "新規作成"}</p>
      <TextField
        name="createTag"
        label="タグ名"
        id="create_tag"
        value={tagNameField}
        onChange={(e) => setTagNameField(e.target.value)}
        />
      <Button onClick={() => handleOnClick()}>
        {isEditting ? "更新" : "作成"}
      </Button>
      <AllTags edittable handleOnEditting={handleOnEditting}/>
    </div>
  )
}
