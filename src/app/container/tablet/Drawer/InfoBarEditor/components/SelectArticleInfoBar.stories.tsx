import React from 'react';
import {
  SelectArticleInfoBar,
  TSelectArticleInfoBar,
} from './SelectArticleInfoBar';
import { sampleAllArticles } from '../../../../../../stories/lib/sampleAllArticles';
export default {
  title: 'Drawer/InfoBar/SelectArticleOnInfoBar',
  component: SelectArticleInfoBar,
};

export const Normal = () => {
  const [articleInfoBar, setArticleInfoBar] = React.useState(2);

  const props: TSelectArticleInfoBar = {
    AllArticles: sampleAllArticles,
    articleInfoBar,
    setArticleInfoBar,
  };

  return <SelectArticleInfoBar {...props} />;
};
