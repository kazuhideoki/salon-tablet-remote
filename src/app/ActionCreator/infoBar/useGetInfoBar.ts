import React from "react";
import { Store } from "../../Store/Store";
import { apiInfoBarGet } from "../../../pages/api/info_bar/get";
import { TInfoBarData } from "../../Store/Types";
import { InfoBarContext } from "../../Store/infoBar/Context";
import { set } from "../../Store/infoBar/actions";

export const useGetInfoBar = () => {
  const { dispatchAppState, appState } = React.useContext(Store);
  const { dispatchInfoBar } = React.useContext(InfoBarContext)

  return async () => {

    const data = await apiInfoBarGet(appState.userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchInfoBar(set(data))
    }
  };
};
