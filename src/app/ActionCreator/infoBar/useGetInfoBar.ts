import React from "react";
import { apiInfoBarGet } from "../../../pages/api/info_bar/get";
import { TInfoBarData } from "../../Store/Types";
import { InfoBarContext } from "../../Store/infoBar/Context";
import { set } from "../../Store/infoBar/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";

export const useGetInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInfoBar } = React.useContext(InfoBarContext)

  return async () => {

    const data = await apiInfoBarGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      dispatchInfoBar(set(data))
    }
  };
};
