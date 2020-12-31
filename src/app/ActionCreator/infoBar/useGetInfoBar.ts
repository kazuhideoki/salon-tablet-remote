import React from "react";
import { apiInfoBarGet } from "../../../pages/api/info_bar/get";
import { InfoBarContext } from "../../Store/infoBar/Context";
import { set } from "../../Store/infoBar/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { isLoadingFooter } from "../../Store/appState/actions";

export const useGetInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInfoBar } = React.useContext(InfoBarContext)

  return async () => {

    try {
      const data = await apiInfoBarGet(userInfo.user_id);
      dispatchInfoBar(set(data))
    } catch (err) {
      alert("取得できませんでした");
      dispatchAppState(isLoadingFooter(false))

    }
  };
};
