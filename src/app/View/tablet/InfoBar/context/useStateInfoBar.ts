import React from "react";
import { Store } from "../../../../Store/Store";

export const useStateInfoBar = () => {
  const { appState, dispatchAppState } = React.useContext(Store);
  const { infoBarData, isSetting } = appState;
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