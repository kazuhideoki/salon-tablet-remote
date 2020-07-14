import React from 'react'
import { AllTags } from './AllTags'
import { TextField, Button } from '@material-ui/core'
import { useCreateTags } from '../../ActionCreator/tags/useCreateTag'

export const ManageTags = () => {
  const [tagName, setTagName] = React.useState('')
  const createTags = useCreateTags()

  const handleOnClick = () => {
    console.log("ManageTagsのhandleOnClickだよ");
    
    createTags(tagName)
  }

  return (
    <div>
      タグの管理を行います。新規追加したり、修正したり
      <TextField
        name="createTag"
        label="タグ名"
        id="create_tag"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        />
      <AllTags/>
      <Button onClick={() => handleOnClick()}>
        作成
      </Button>
    </div>
  )
}
