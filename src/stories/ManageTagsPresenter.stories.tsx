import React from 'react';
import { ManageTagsPresenter } from '../app/View/Drawer/ManageTags';
import { sampleTags } from './lib/sampleTags';
import { Provider } from './lib/ThemeProvider';
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
    <Provider>
    <ManageTagsPresenter {...props}/>
    </Provider>
  )
}
export const Loading = () => {

  return (
    <Provider>

      <ManageTagsPresenter {...props} loading={true}/>
    </Provider>
  )
}
export const noTags = () => {

  return (
    <Provider>
      <ManageTagsPresenter {...props} tags={[]}/>

    </Provider>
  )
}