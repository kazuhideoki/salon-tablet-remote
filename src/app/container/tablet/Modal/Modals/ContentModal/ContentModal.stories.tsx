import React from 'react';
import { ContentModalPresenterProps } from './useContentModalProps';
import { sampleArticles } from '../../../../../../util/dev/sampleArticles';
import { ContentModalPresenter } from './ContentModal';
export default {
  title: 'Main/ContentModal',
  component: ContentModalPresenter,
};

const props: ContentModalPresenterProps = { article: sampleArticles[0] };

export const Normal = () => {
  return <ContentModalPresenter {...props} />;
};
