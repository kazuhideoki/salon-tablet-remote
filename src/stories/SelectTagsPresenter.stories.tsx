import React from 'react';
import {
  SelectTagsPresenter,
  TSelectTagsPresenter,
} from '../app/View/tablet/Modal/Modals/SelectTags/view/SelectTags';
import { sampleTags } from './lib/sampleTags';
import { ThemeProvider } from './lib/ThemeProvider';
export default {
  title: 'Footer/SelectTagsPresenter',
  component: SelectTagsPresenter,
};

const props: TSelectTagsPresenter = {
  tags: sampleTags,
  selectingTags: [],
  handleSelectTag: () => {
    return;
  },
  handleGetArticle: () => {
    return;
  },
};

export const Normal = () => {
  return (
    <ThemeProvider>
      <SelectTagsPresenter {...props} />
    </ThemeProvider>
  );
};
