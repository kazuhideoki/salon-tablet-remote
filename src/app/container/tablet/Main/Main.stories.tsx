import React from 'react';
import { MainPresenter, MainPresenterProps } from './Main';
import { sampleArticles } from '../../../../util/dev/sampleArticles';
import { initInstagramMediaObject } from '../../../../util/interface/Interface';
export default {
  title: 'Main/Main',
  component: MainPresenter,
};

const props: MainPresenterProps = {
  articles: sampleArticles,
  isSetting: false,
  instagramMediaObject: initInstagramMediaObject,
  tags: [],
  deleteArticle: async () => {
    return;
  },
  dispatchAppState: () => {
    return;
  },
  isShowInstagram: false,
  onClickUpdate: () => {
    return;
  },
  loading: false,
  show_article_type: 'scroll',
  openArticleModal: () => {
    return;
  },
  openInstagramModal: () => {
    return;
  },
  handleLoadingMain: () => {
    return;
  },
};

export const Normal = () => {
  return (
    <>
      <div style={{ height: '65vh' }}>
        <MainPresenter {...props} />
      </div>
      ※全画面にして表示を確認
    </>
  );
};
export const Loading = () => {
  return (
    <>
      <div style={{ height: '65vh' }}>
        <MainPresenter {...props} loading={true} />
      </div>
      ※全画面にして表示を確認
    </>
  );
};

export const NoArticles = () => {
  return (
    <>
      <div style={{ height: '65vh' }}>
        <MainPresenter {...props} articles={[]} />
      </div>
      ※全画面にして表示を確認
    </>
  );
};
