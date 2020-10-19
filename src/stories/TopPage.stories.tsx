import React from 'react';
import { TopPage } from '../pageComponent/TopPage';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export default {
  title: 'pageComponent/TopPage',
  component: TopPage,
};


export const Normal = () => {
  const props = {
    csrfToken: null,
    providers: {facebook:  {signinUrl: 'abc'}},
  }


  return (
    <>
    <ParallaxProvider>
      <TopPage {...props}/>

    </ParallaxProvider>
    </>
  )
}