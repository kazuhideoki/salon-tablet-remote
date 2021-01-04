import React from 'react';
import { SelectTagsPresenter } from '../app/View/tablet/Modal/Modals/SelectTags/view/SelectTags';
import { sampleTags } from './lib/sampleTags';
import { ThemeProvider } from './lib/ThemeProvider';
export default {
  title: 'Footer/SelectTagsPresenter',
  component: SelectTagsPresenter,
};

const props = {
  tags: sampleTags,
  selectingTags: [],
  handleSelectTag: null,
  handleGetArticle: null,
};

export const Normal = () => {
  return (
    <ThemeProvider>
      <SelectTagsPresenter {...props} />
    </ThemeProvider>
  );
};
