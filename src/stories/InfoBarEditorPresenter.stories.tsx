import React from 'react';
import {
  InfoBarEditorPresenter,
  TUseInfoBarEditorProps,
} from '../app/View/tablet/Drawer/InfoBarEditor/view/InfoBarEditor';
import { T_info_bar_type } from '../app/Store/Interface';
import { sampleAllArticles } from './lib/sampleAllArticles';
export default {
  title: 'Drawer/InfoBar/InfoBarEditorPresenter',
  component: InfoBarEditorPresenter,
};

export const Normal = () => {
  const [editorText, setEditorText] = React.useState('');
  const [charCount, setCharCount] = React.useState(0);
  const [infoBarType, setInfoBarType] = React.useState(
    'shop_name' as T_info_bar_type
  );
  const [articleInfoBar, setArticleInfoBar] = React.useState(2);

  const props: TUseInfoBarEditorProps = {
    editorText,
    setEditorText,
    charCount,
    setCharCount,
    infoBarType,
    setInfoBarType,
    articleInfoBar,
    setArticleInfoBar,
    allArticles: sampleAllArticles,
    updateInfoBar: async () => {
      return;
    },
  };

  return <InfoBarEditorPresenter {...props} />;
};
