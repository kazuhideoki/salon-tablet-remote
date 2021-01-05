import React from 'react';
import { ManageTagsPresenter, ManageTagsPresenterProps } from './ManageTags';
import { sampleTags } from '../../../../../util/dev/sampleTags';
import { ThemeProvider } from '../../../../components/ThemeProviderInStorybook';
export default {
  title: 'Drawer/ManageTagsPresenter',
  component: ManageTagsPresenter,
};

const props: ManageTagsPresenterProps = {
  tags: sampleTags,
  loading: false,
  edittingTagName: '',
  isEditting: false,
  tagNameField: '',
  setTagNameField: () => {
    return;
  },
  edittingTagId: 0,
  handleOnClick: () => {
    return;
  },
  handleOnCreateNew: () => {
    return;
  },
  handleOnEditting: () => {
    return;
  },
  deleteTag: async () => {
    return;
  },
  isValidTagName: () => true,
  handleLoadingTags: () => {
    return;
  },
};

export const Normal = () => {
  return (
    <ThemeProvider>
      <ManageTagsPresenter {...props} />
    </ThemeProvider>
  );
};
export const Loading = () => {
  return (
    <ThemeProvider>
      <ManageTagsPresenter {...props} loading={true} />
    </ThemeProvider>
  );
};
export const noTags = () => {
  return (
    <ThemeProvider>
      <ManageTagsPresenter {...props} tags={[]} />
    </ThemeProvider>
  );
};
