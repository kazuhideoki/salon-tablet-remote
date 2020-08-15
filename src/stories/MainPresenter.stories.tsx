import React from 'react';
import { PMainPresenter } from '../app/View/Main/PMain';
import { sampleData } from './lib/sampleArticles';
import { initInstagramMedias } from '../app/Store/Types';
export default {
  title: "Main/PMain",
  component: PMainPresenter,
};

const props = {
  appState: {
    isSetting: true,
  },
  articles: sampleData,
  handleOnUpDate: null,
  handleOnDelete: null,
  classes: null,
  isSetting: false,
  instagramMedias: initInstagramMedias,
  tags: [],
  deleteArticle: null,
  dispatchAppState: null,
  isShowInstagram: false,
  onClickUpdate: null,
  loading: false,
};

export const Normal = () => {

  return (
    <>
    <div style={{height: "65vh"}}>
      <PMainPresenter {...props}/>
    </div>
    ※全画面にして表示を確認
    </>
    
  )
}
export const Loading = () => {

  return (
    <>
      <div style={{height: "65vh"}}>
        <PMainPresenter {...props} loading={true} />
      </div>
      ※全画面にして表示を確認
    </>
  );
}


export const NoArticles = () => {
  return (
    <>
      <div style={{ height: "65vh" }}>
        <PMainPresenter {...props} articles={[]} />
      </div>
      ※全画面にして表示を確認
    </>
  );
};