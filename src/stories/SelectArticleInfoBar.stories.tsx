import React from 'react';
import {
  SelectArticleInfoBar,
  TSelectArticleInfoBar,
} from '../app/container/tablet/Drawer/InfoBarEditor/components/SelectArticleInfoBar';
import { sampleAllArticles } from './lib/sampleAllArticles';
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
