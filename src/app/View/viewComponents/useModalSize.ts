import React from 'react'

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
// export const smallPortrait = {
//   width: "70vw",
//   height: "70vw", // 横と同じ長さ→正方形
//   // maxWidth: "100%",
//   // maxHeight: "100%",
//   margin: 0,
// };
// export const smallLandscape = {
//   width: "70vh",// 縦と同じ長さ→正方形
//   height: "70vh", 
//   // maxWidth: "100%",
//   // maxHeight: "100%",
//   margin: 0,
// };

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

export const useModalSize  = (modalSize: string) => {


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