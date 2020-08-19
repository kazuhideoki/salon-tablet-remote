import React from 'react';
import { SelectTagsPresenter } from '../app/View/Footer/SelectTags';
import { sampleTags } from './lib/sampleTags';
import { Provider } from './lib/ThemeProvider';
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
    <Provider>

      <SelectTagsPresenter {...props}/>
    </Provider>
  )
}