import React from 'react';
import {
  ContentModalPresenter,
  ContentModalPresenterProps,
} from './ContentModal';
import { sampleData } from '../../../../../../util/dev/sampleArticles';
export default {
  title: 'Main/ContentModal',
  component: ContentModalPresenter,
};

const props: ContentModalPresenterProps = { article: sampleData[0] };

export const Normal = () => {
  return <ContentModalPresenter {...props} />;
};
