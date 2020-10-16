import React from 'react';
import { TopPage } from '../pageComponent/TopPage';
export default {
  title: 'pageComponent/TopPage',
  component: TopPage,
};


export const Normal = () => {
  const props = {
    csrfToken: null,
    providers: null, // 指定必要
  }


  return (
    <TopPage {...props}/>
  )
}