import React from 'react';
import { SelectTagsPresenter } from './SelectTags';
import { sampleTags } from '../../../../../../util/dev/sampleTags';
import { ThemeProvider } from '../../../../../components/ThemeProviderInStorybook';
import { SelectTagsPresenterProps } from './useSelectTags';
export default {
  title: 'Footer/SelectTagsPresenter',
  component: SelectTagsPresenter,
};

const props: SelectTagsPresenterProps = {
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
