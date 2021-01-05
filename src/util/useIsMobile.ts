import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { AppStateContext } from '../app/store/appState/Context';

export const useIsMobile = () => {
  const { appState } = React.useContext(AppStateContext);
  const { uaDevice } = appState;

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

  if (smallWidth || smallHeight) {
    return true;
  } else {
    return false;
  }
};
