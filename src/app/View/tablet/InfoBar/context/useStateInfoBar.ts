import React from "react";
import { InfoBarContext } from "../../../../Store/infoBar/Context";
import { Store } from "../../../../Store/Store";

export const useStateInfoBar = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { isSetting } = appState;
  const { infoBarData } = React.useContext(InfoBarContext)
  const { infoBar, targetArticle } = infoBarData;
  const { shop_name } = appState.userInfo;

  return {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    shop_name,
  };
}