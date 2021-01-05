import React from 'react';
import { SelectTagsPresenter, TSelectTagsPresenter } from './SelectTags';
import { sampleTags } from '../../../../../../stories/lib/sampleTags';
import { ThemeProvider } from '../../../../../../stories/lib/ThemeProvider';
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
