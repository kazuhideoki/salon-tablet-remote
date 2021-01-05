import React from 'react';
import { ContentModalPresenter, TContentModalProps } from './ContentModal';
import { sampleData } from '../../../../../../stories/lib/sampleArticles';
export default {
  title: 'Main/ContentModal',
  component: ContentModalPresenter,
};

const props: TContentModalProps = sampleData[0];

export const Normal = () => {
  return <ContentModalPresenter {...props} />;
};
