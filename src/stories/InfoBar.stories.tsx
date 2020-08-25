import React from 'react';
import { InfoBarPresenter, TUseInfoBarProps } from '../app/View/InfoBar';
import { TInfoBar, TArticle } from '../app/Store/Types';
import { sampleData } from "./lib/sampleArticles";
export default {
  title: "InfoBarPresenter",
  component: InfoBarPresenter,
};

const props: TUseInfoBarProps = {
  dispatchAppState: null,
  isSetting: null,
  infoBar: {
    info_bar_id: null,
    user_id: null,
    info_bar_type: "shop_name",
    scrolling_sentence: "この文章がすくろーるします <B>お知らせの表示などに使います。</B>",
    selected_article_on_info_bar: null,
  },
  targetArticle: sampleData[0],
  handleOnClick: null,
  shop_name: "salon de なんちゃら",
};

export const shop_name = () => <InfoBarPresenter {...props} />;

export const scrolling_sentence = () => {
  
  props.infoBar.info_bar_type = 'scrolling_sentence';
  return <InfoBarPresenter {...props} />;
}

export const article = () => {
  props.infoBar.info_bar_type = 'article';

  return <InfoBarPresenter {...props} />;
}