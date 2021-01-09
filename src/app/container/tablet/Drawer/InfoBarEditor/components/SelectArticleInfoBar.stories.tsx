import React from 'react';
import {
  SelectArticleInfoBar,
  SelectArticleInfoBarProps,
} from './SelectArticleInfoBar';
import { sampleAllArticles } from '../../../../../../util/dev/sampleAllArticles';
export default {
  title: 'Drawer/InfoBar/SelectArticleOnInfoBar',
  component: SelectArticleInfoBar,
};

export const Normal = () => {
  const [articleInfoBar, setArticleInfoBar] = React.useState(2);

  const props: SelectArticleInfoBarProps = {
    AllArticles: sampleAllArticles,
    articleInfoBar,
    setArticleInfoBar,
  };

  return <SelectArticleInfoBar {...props} />;
};
