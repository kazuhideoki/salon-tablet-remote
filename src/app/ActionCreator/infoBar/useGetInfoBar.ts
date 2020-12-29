import React from "react";
import { apiInfoBarGet } from "../../../pages/api/info_bar/get";
import { InfoBarContext } from "../../Store/infoBar/Context";
import { set } from "../../Store/infoBar/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useFooterProps } from "../../View/tablet/Footer/Footer/view/Footer";

export const useGetInfoBar = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchInfoBar } = React.useContext(InfoBarContext)
  const { handleLoadingFooter } = useFooterProps()

  return async () => {

    const data = await apiInfoBarGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      handleLoadingFooter(false)
    } else {
      dispatchInfoBar(set(data))
    }
  };
};
