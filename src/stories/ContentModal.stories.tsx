import React from 'react';
import { ContentModalPresenter, TContentModalProps } from '../app/View/Main/ContentModal';
import { sampleData } from './SampleData';
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