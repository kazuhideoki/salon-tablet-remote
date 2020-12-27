import React from 'react';
import { ContentModalPresenter, TContentModalProps } from '../app/View/tablet/Modal/Modals/ContentModal/view/ContentModal';
import { sampleData } from './lib/sampleArticles';
export default {
  title: "Main/ContentModal",
  component: ContentModalPresenter,
};

const props: TContentModalProps = sampleData[0]

export const Normal = () => {

  return (
    <ContentModalPresenter {...props}/>
  )
}