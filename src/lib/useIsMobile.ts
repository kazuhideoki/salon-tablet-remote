import React from 'react'
import { useMediaQuery } from "@material-ui/core";
import { Store } from '../app/Store/Store';

export const useIsMobile = () => {
  const { appState } = React.useContext(Store)
  const { uaDevice, selectedDevice } = appState
  const smallWidth = useMediaQuery("(max-width:480px)");
  // const smallWidth = useMediaQuery("(max-width:480px)", {
  //   defaultMatches: props.window().matchMedia,
  // });
  const smallHeight = useMediaQuery("(max-height:480px)");
  // const smallHeight = useMediaQuery("(max-height:480px)", {
  //   matchMedia: props.window().matchMedia,
  // });

  if (selectedDevice === "mobile") {
    console.log('selectedDevice === "mobile"');

    return true;
  }
  if (selectedDevice === "tablet") {
    console.log('selectedDevice === "tablet"');
    return false;
  }


  // SSRで初期表示させるときの処理 + フロントの最初の描画ではmediaQuerryの情報がないのでuaDeviceをもとに描画
  if (process.browser === false || !smallWidth || !smallHeight) {
    if (uaDevice === "mobile" || uaDevice === "wearable") {
      console.log("★mobile");
      return true;
    } else {
      console.log("★tablet");
      return false;
    }
  }

  // if (selectedDevice === 'mobile') {
  //   console.log('selectedDevice === "mobile"');
    
  //   return true
  // }
  // if (selectedDevice === 'tablet') {
  //   console.log('selectedDevice === "tablet"');
  //   return false
  // }

  if (smallWidth || smallHeight) {
    console.log("(smallWidth || smallHeight)");
    return true
  } else {
    console.log('useIsMobileの一番下でfalse');
    
    return false
  }

}