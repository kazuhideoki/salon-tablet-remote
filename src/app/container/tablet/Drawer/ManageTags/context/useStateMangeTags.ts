import React from 'react';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { TagsContext } from '../../../../../stores/tags/Context';

export const useStateMangeTags = () => {
  const { appState } = React.useContext(AppStateContext);
  const { loading } = appState;
  const { tags } = React.useContext(TagsContext);
  const [tagNameField, setTagNameField] = React.useState('');
  const [isEditting, setIsEditting] = React.useState(false);
  const [edittingTagId, setEditingTagId] = React.useState(0);
  const [edittingTagName, setEditingTagName] = React.useState('');

  const handleOnEditting = (TagId: number, tagName: string) => {
    setIsEditting(true);
    setEditingTagId(TagId);
    setTagNameField(tagName);
    setEditingTagName(tagName);
  };

  const handleOnCreateNew = () => {
    setIsEditting(false);
    setEditingTagId(0);
    setTagNameField('');
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
};
