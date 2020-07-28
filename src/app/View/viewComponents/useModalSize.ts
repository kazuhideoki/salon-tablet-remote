import React from 'react'
import { T_modal_size } from '../../Store/Store';

export const fullScreen = {
  width: "100vw",
  height: "100vh",
  // maxWidth: "100%",
  maxHeight: "100%",
  margin: 0,
};
export const large = {
  width: "90vw",
  height: "90vh",
  // maxWidth: "100%",
  // maxHeight: "100%",
  margin: 0,
};
export const medium = {
  width: "75vw",
  height: "75vh",
  // maxWidth: "100%",
  // maxHeight: "100%",
  margin: 0,
};

const shortSide = () => {
  if (window.innerHeight > window.innerWidth) {
    return window.innerWidth;
  } else {
    return window.innerHeight;
  }
}
export const small = process.browser ? {
  width: `${shortSide() * 0.6}px`,
  height: `${shortSide() * 0.6}px`,
  // maxWidth: "100%",
  // maxHeight: "100%",
  margin: 0,
} : null

export const useModalSize  = (modalSize: T_modal_size) => {

  switch (modalSize) {
    case "fullScreen":
      return fullScreen;
    case "large":
      return large;
    case "medium":
      return medium;
    case "small":
      return small
  }
}