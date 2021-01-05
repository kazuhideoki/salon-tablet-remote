import React from 'react';
import { ModalSize } from '../../../../../../util/interface/Interface';

export const fullScreen = {
  width: '100vw',
  height: '100vh',
  maxHeight: '100%',
  margin: 0,
};
export const large = {
  width: '90vw',
  height: '90vh',
  margin: 0,
};
export const medium = {
  width: '75vw',
  height: '75vh',
  margin: 0,
};

const shortSide = () => {
  if (window.innerHeight > window.innerWidth) {
    return window.innerWidth;
  } else {
    return window.innerHeight;
  }
};
export const small =
  typeof window !== 'undefined'
    ? {
        width: `${shortSide() * 0.6}px`,
        height: `${shortSide() * 0.6}px`,
        // maxWidth: "100%",
        // maxHeight: "100%",
        margin: 0,
      }
    : null;

const upperSide = {
  width: '90vw',
  height: 'fit-content',
  margin: 0,
  marginBottom: 'auto',
  marginTop: 50,
};

export const useModalSize = (modalSize: ModalSize) => {
  switch (modalSize) {
    case 'fullScreen':
      return fullScreen;
    case 'large':
      return large;
    case 'medium':
      return medium;
    case 'small':
      return small;
    case 'upperSide':
      return upperSide;
  }
};
