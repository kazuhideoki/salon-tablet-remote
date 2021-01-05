import React from 'react';
import { MainMobilePresenter } from '../app/container/mobile/MainMobile/MainMobile';
import { sampleData } from './lib/sampleArticles';
export default {
  title: 'mobile/MainMobile',
  component: MainMobilePresenter,
};

const props = {
  appState: {
    isSetting: true,
  },
  isSetting: false,
  loading: {
    mainArticles: false,
  },
  articles: sampleData,
  handleOnUpDate: null,
  handleOnDelete: null,
  classes: null,
  handleOpenArticleEditor: null,
};

export const Normal = () => {
  return (
    //@ts-ignore
    <MainMobilePresenter {...props} />
  );
};
export const isSetting = () => {
  return (
    //@ts-ignore
    <MainMobilePresenter {...props} isSetting={true} />
  );
};
