import React from 'react';
import { AppStateContext } from '../../../../stores/appState/Context';
import { InfoBarContext } from '../../../../stores/infoBar/Context';
import { UserInfoContext } from '../../../../stores/userInfo/Context';

export const useStateInfoBar = () => {
  const { appState, dispatchAppState } = React.useContext(AppStateContext);
  const { isSetting } = appState;
  const { infoBarData } = React.useContext(InfoBarContext);
  const { infoBar, targetArticle } = infoBarData;
  const { userInfo } = React.useContext(UserInfoContext);
  const { shop_name } = userInfo;

  return {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    shop_name,
  };
};
