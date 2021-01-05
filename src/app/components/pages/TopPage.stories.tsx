import React from 'react';
import { TopPage } from './TopPage';
import { ParallaxProvider } from 'react-scroll-parallax';
import { WebsiteThemeProvider } from '../../store/theme/lib/themes/websiteTheme';

export default {
  title: 'pageComponent/TopPage',
  component: TopPage,
};

export const Normal = () => {
  return (
    <>
      <WebsiteThemeProvider>
        <ParallaxProvider>
          <TopPage />
        </ParallaxProvider>
      </WebsiteThemeProvider>
    </>
  );
};
