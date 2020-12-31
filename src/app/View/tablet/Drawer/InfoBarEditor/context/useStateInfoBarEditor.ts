import React from 'react'
import { ArticlesContext } from '../../../../../Store/articles/Context';
import { InfoBarContext } from '../../../../../Store/infoBar/Context';

export const useStateInfoBarEditor = () => {
  const { allArticles } = React.useContext(ArticlesContext)
  const { infoBarData } = React.useContext(InfoBarContext)
  const {
    info_bar_type,
    scrolling_sentence,
    selected_article_id,
  } = infoBarData.infoBar;

  const [infoBarType, setInfoBarType] = React.useState(info_bar_type);
  const [editorText, setEditorText] = React.useState(scrolling_sentence);
  const [articleInfoBar, setArticleInfoBar] = React.useState(
    selected_article_id as number
  );
  const [charCount, setCharCount] = React.useState(0);

  return {
    allArticles,
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    articleInfoBar,
    setArticleInfoBar,
    charCount,
    setCharCount,
  };
}