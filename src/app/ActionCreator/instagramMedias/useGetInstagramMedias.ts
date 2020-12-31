import React from "react";
import { apiInstagramMediasGet } from "../../../pages/api/instagram_medias/get";
import { T_instagram_id, T_instagram_username } from "../../Store/Types";
import { apiInstagramAccountsReconnectNeeded, T_instagram_accounts_reconnect_needed } from "../../../pages/api/instagram_accounts/reconnect_needed";
import { InstagramContext } from "../../Store/instagram/Context";
import { setMedias, setReconnect } from "../../Store/instagram/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { closeModal, isLoadingMain, isShowInstagram, setSelectedInstagramAccounts } from "../../Store/appState/actions";

export const useGetInstagramMedias = () => {
  const {
    dispatchAppState,
  } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const user_id = userInfo.user_id
  const { dispatchInstagram } = React.useContext(InstagramContext);


  // ページ送りでないときは空のオブジェクト
  return async (instagram_id: T_instagram_id, username: T_instagram_username, paging: {after?: string, before?: string }) => {
    console.log("useGetInstagramMediasだよ");
    
    
    dispatchAppState(isLoadingMain(true))
    dispatchAppState(closeModal())

    const data = await apiInstagramMediasGet(instagram_id, paging);

    const params:T_instagram_accounts_reconnect_needed  = {instagram_id: instagram_id, user_id: user_id, is_reconnect_needed: true}

    if (data.err === true) {
      alert("取得できませんでした");
      if (data.data.message.type === "OAuthException") {
        console.log("message.typeは OAuthException");
        alert("インスタグラムアカウントの再連携が必要です");
        const result = await apiInstagramAccountsReconnectNeeded(params)
        if(result.err !== true) dispatchInstagram(setReconnect(instagram_id));
      }
      dispatchAppState(isLoadingMain(false));
    } else {
      dispatchInstagram(setMedias(data))
      dispatchAppState(
        setSelectedInstagramAccounts({ id: instagram_id, username })
      );
      dispatchAppState(isShowInstagram(true))
      dispatchAppState(isLoadingMain(false));

    }
  };
};


