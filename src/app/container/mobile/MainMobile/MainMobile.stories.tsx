import React from 'react';
import { MainMobilePresenter } from './MainMobile';
import { sampleData } from '../../../../stories/lib/sampleArticles';
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
