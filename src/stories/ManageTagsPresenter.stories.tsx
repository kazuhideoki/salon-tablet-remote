import React from 'react';
import { ManageTagsPresenter } from '../app/View/Drawer/ManageTags';
import { sampleTags } from './sampleTags';
export default {
  title: 'Drawer/ManageTagsPresenter',
  component: ManageTagsPresenter,
};

const props = {
  tags: sampleTags,
  loading: false,
  edittingTagName: '',
  isEditting: false,
  tagNameField: '',
  setTagNameField: null,
  edittingTagId: null,
  handleOnClick: null,
  handleOnCreateNew: null,
  handleOnEditting: null,
  deleteTag: null,
  isValidTagName: () => true,
};

export const Normal = () => {

  return (
    <ManageTagsPresenter {...props}/>
  )
}
export const Loading = () => {

  return (
    <ManageTagsPresenter {...props} loading={true}/>
  )
}