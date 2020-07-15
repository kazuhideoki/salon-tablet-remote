import React from 'react'
import { AllTags } from './AllTags'
import { TextField, Button, Chip } from '@material-ui/core'
import { useCreateTag } from '../../ActionCreator/tags/useCreateTag'
import { useUpdateTag } from '../../ActionCreator/tags/useUpdateTag'
import { Store } from '../../Store/Store'
import { useDeleteTag } from '../../ActionCreator/tags/useDeleteTag'

export const ManageTags = () => {
  const {tags} = React.useContext(Store)
  const [tagNameField, setTagNameField] = React.useState('')
  const [isEditting, setIsEditting] = React.useState(false)
  const [edittingTagId, setEditingTagId] = React.useState(0)
  const [edittingTagName, setEditingTagName] = React.useState('')
  const createTag = useCreateTag()
  const updateTag = useUpdateTag()
  const deleteTag = useDeleteTag();

  const handleOnEditting = (TagId: number, tagName: string) => {
    setIsEditting(true)
    setEditingTagId(TagId)
    setTagNameField(tagName)
    setEditingTagName(tagName)
  }

  const handleOnCreateNew = () => {
    setIsEditting(false)
    setEditingTagId(null);
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

  const handleDelete = (tag_id) => {
    const deleting = confirm("本当に削除してよろしいですか？");
    deleting ? deleteTag(tag_id) : null;
  };

  return (
    <div>
      <h2>タグの管理を行います。新規追加したり、修正したり</h2>
      <p>
        {isEditting ? (
          <>
            {edittingTagName + "を編集中"}
            <Button onClick={() => handleOnCreateNew()}>新規作成</Button>
          </>
        ) : (
          "新規作成"
        )}
      </p>
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
      <div>
        {tags.map((value, key) => {
          return (
            <Chip
              key={key}
              label={value.tag_name}
              color={value.tag_id === edittingTagId ? "primary" : undefined}
              onClick={
                isEditting && value.tag_id === edittingTagId // 編集中にもう一度タップすると新規作成に戻る
                  ? () => handleOnCreateNew()
                  : () => handleOnEditting(value.tag_id, value.tag_name)
              }
              onDelete={() => handleDelete(value.tag_id)}
            />
          );
        })}
      </div>
      {/* <AllTags
        edittable
        handleOnEditting={handleOnEditting}
        edittingTagId={edittingTagId}
      /> */}
    </div>
  );
}
