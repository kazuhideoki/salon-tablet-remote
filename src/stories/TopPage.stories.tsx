import React from 'react';
import { TopPage } from '../pageComponent/TopPage';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { WebsiteThemeProvider } from '../app/Store/theme/lib/themes/websiteTheme';

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
    <WebsiteThemeProvider>

    <ParallaxProvider>
      <TopPage {...props}/>

    </ParallaxProvider>
    </WebsiteThemeProvider>
    </>
  )
}