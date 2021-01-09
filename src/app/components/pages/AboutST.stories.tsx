import React from 'react';
import { AboutST } from './AboutST';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export default {
  title: 'pageComponent/AboutST',
  component: AboutST,
};

export const Normal = () => {
  return (
    <ParallaxProvider>
      <AboutST />
    </ParallaxProvider>
  );
};
