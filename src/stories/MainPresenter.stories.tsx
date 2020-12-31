import React from 'react';
import { MainPresenter, TUseMainProps } from '../app/View/tablet/Main/view/Main';
import { sampleData } from './lib/sampleArticles';
import { initInstagramMedias } from '../app/Store/Interface';
export default {
  title: "Main/Main",
  component: MainPresenter,
};

const props: TUseMainProps = {
  articles: sampleData,
  isSetting: false,
  instagramMedias: initInstagramMedias,
  tags: [],
  deleteArticle: null,
  dispatchAppState: null,
  isShowInstagram: false,
  onClickUpdate: null,
  loading: false,
  show_article_type: 'scroll',
};

export const Normal = () => {

  return (
    <>
    <div style={{height: "65vh"}}>
      <MainPresenter {...props}/>
    </div>
    ※全画面にして表示を確認
    </>
    
  )
}
export const Loading = () => {

  return (
    <>
      <div style={{height: "65vh"}}>
        <MainPresenter {...props} loading={true} />
      </div>
      ※全画面にして表示を確認
    </>
  );
}


export const NoArticles = () => {
  return (
    <>
      <div style={{ height: "65vh" }}>
        <MainPresenter {...props} articles={[]} />
      </div>
      ※全画面にして表示を確認
    </>
  );
};