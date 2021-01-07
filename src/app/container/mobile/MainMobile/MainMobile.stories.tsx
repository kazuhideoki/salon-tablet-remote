import React from 'react';
import { MainMobilePresenter } from './MainMobile';
import { sampleArticles } from '../../../../util/dev/sampleArticles';
import { MainPresenterProps } from '../../tablet/Main/Main';
import { sampleTags } from '../../../../util/dev/sampleTags';
import { sampleInstagramMediaObject } from '../../../../util/dev/sampleData/sampleInstagramMediaObject';
export default {
  title: 'mobile/MainMobile',
  component: MainMobilePresenter,
};

export const props: MainPresenterProps = {
  isSetting: false,
  articles: sampleArticles,
  instagramMediaObject: sampleInstagramMediaObject,
  tags: sampleTags,
  deleteArticle: async () => {
    return;
  },

  dispatchAppState: () => {
    return;
  },
  openArticleModal: () => {
    return;
  },
  openInstagramModal: () => {
    return;
  },

  isShowInstagram: false,
  show_article_type: 'scroll',
  onClickUpdate: () => {
    return;
  },
  loading: false,
  handleLoadingMain: () => {
    return;
  },
};

export const Normal = (): JSX.Element => {
  return <MainMobilePresenter {...props} />;
};
export const isSetting = (): JSX.Element => {
  return <MainMobilePresenter {...props} isSetting={true} />;
};
