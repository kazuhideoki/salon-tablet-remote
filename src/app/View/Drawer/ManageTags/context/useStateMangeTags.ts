import React from 'react'
import { Store } from '../../../../Store/Store';

export const useStateMangeTags = () => {
  const { appState } = React.useContext(Store);
  const { tags, loading } = appState;
  const [tagNameField, setTagNameField] = React.useState("");
  const [isEditting, setIsEditting] = React.useState(false);
  const [edittingTagId, setEditingTagId] = React.useState(0);
  const [edittingTagName, setEditingTagName] = React.useState("");

  const handleOnEditting = (TagId: number, tagName: string) => {
    setIsEditting(true);
    setEditingTagId(TagId);
    setTagNameField(tagName);
    setEditingTagName(tagName);
  };

  const handleOnCreateNew = () => {
    setIsEditting(false);
    setEditingTagId(null);
    setTagNameField("");
  };

  return {
    tags,
    loading,
    tagNameField,
    setTagNameField,
    isEditting,
    edittingTagId,
    edittingTagName,
    handleOnEditting,
    handleOnCreateNew,
  };
}