import React from 'react';
import { PMainPresenter } from '../app/View/Main/PMain';
import { sampleData } from './SampleData';
export default {
  title: 'PMainPresenter',
  component: PMainPresenter,
};

const props = {
  appState: {
    isSetting: true,
  },
  articles: sampleData,
  handleOnUpDate: null,
  handleOnDelete: null,
  openArticle: null,
};

export const Normal = () => {

  return (
    //@ts-ignore
    <PMainPresenter {...props}/>
  )
}