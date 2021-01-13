import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { AppStateContext } from '../app/stores/appState/Context';

export const useIsMobile = (): boolean => {
  const { appState } = React.useContext(AppStateContext);
  const { uaDevice, samplePage } = appState;

  // 描画直後の判定に（直後はmobileでもfalseになるため）
  const defaultMatches = () => {
    if (uaDevice === 'mobile' || uaDevice === 'wearable') {
      return true;
    } else {
      return false;
    }
  };

  const smallWidth = useMediaQuery('(max-width:480px)', {
    defaultMatches: defaultMatches(),
  });
  const smallHeight = useMediaQuery('(max-height:480px)', {
    defaultMatches: defaultMatches(),
  });

  if (samplePage === 'tablet') {
    return false;
  } else if (samplePage === 'mobile') {
    return true;
  }

  if (smallWidth || smallHeight) {
    return true;
  } else {
    return false;
  }
};
