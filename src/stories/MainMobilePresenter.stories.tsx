import React from 'react';
import { MainMobilePresenter } from '../app/View/mobile/MainMobile';
import { sampleData } from './SampleData';
export default {
  title: "mobile/MainMobile",
  component: MainMobilePresenter,
};

const props = {
  appState: {
    isSetting: true
  },
  loading: {
    mainArticles: false,
  },
  articles: sampleData,
  handleOnUpDate: null,
  handleOnDelete: null,
  openArticle: null,
  handleOpenArticleEditor: null,
};

export const Normal = () => {

  return (
    //@ts-ignore
    <MainMobilePresenter {...props}/>
  )
}