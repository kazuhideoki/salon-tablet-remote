import React from "react";
import { InfoBarContext } from "../../../../Store/infoBar/Context";
import { Store } from "../../../../Store/Store";
import { UserInfoContext } from "../../../../Store/userInfo/Context";

export const useStateInfoBar = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { isSetting } = appState;
  const { infoBarData } = React.useContext(InfoBarContext)
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
}