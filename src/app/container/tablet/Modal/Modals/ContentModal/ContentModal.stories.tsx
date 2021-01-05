import React from 'react';
import { ContentModalPresenter, TContentModalProps } from './ContentModal';
import { sampleData } from '../../../../../../util/dev/sampleArticles';
export default {
  title: 'Main/ContentModal',
  component: ContentModalPresenter,
};

const props: TContentModalProps = { article: sampleData[0] };

export const Normal = () => {
  return <ContentModalPresenter {...props} />;
};
