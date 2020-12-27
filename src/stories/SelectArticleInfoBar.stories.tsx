import React from 'react';
import { SelectArticleInfoBar } from '../app/View/tablet/Drawer/InfoBarEditor/components/SelectArticleInfoBar';
import { sampleAllArticles } from './lib/sampleAllArticles';
export default {
  title: "Drawer/InfoBar/SelectArticleOnInfoBar",
  component: SelectArticleInfoBar,
};


export const Normal = () => {
    const [articleInfoBar, setArticleInfoBar] = React.useState(null as number);


  const props ={
  AllArticles: sampleAllArticles,
  articleInfoBar,
  setArticleInfoBar,
};

  return (
    <SelectArticleInfoBar {...props}/>
  )
}