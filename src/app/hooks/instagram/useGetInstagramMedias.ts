import React from 'react';
import { apiInstagramMediasGet } from '../../../pages/api/instagram_medias/get';
import {
  T_instagram_id,
  T_instagram_username,
} from '../../../util/interface/Interface';
import {
  apiInstagramAccountsReconnectNeeded,
  T_instagram_accounts_reconnect_needed,
} from '../../../pages/api/instagram_accounts/reconnect_needed';
import { InstagramContext } from '../../store/instagram/Context';
import { setMedias, setReconnect } from '../../store/instagram/actions';
import { UserInfoContext } from '../../store/userInfo/Context';
import { AppStateContext } from '../../store/appState/Context';
import {
  closeModal,
  isLoadingMain,
  isShowInstagram,
  setSelectedInstagramAccounts,
} from '../../store/appState/actions';

export const useGetInstagramMedias = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const user_id = userInfo.user_id;
  const { dispatchInstagram } = React.useContext(InstagramContext);

  // ページ送りでないときは空のオブジェクト
  return async (
    instagram_id: T_instagram_id,
    username: T_instagram_username,
    paging: { after?: string; before?: string }
  ) => {
    dispatchAppState(isLoadingMain(true));
    dispatchAppState(closeModal());

    try {
      const data = await apiInstagramMediasGet({ instagram_id, paging });
      dispatchInstagram(setMedias(data.rawData));
      dispatchAppState(
        setSelectedInstagramAccounts({ id: instagram_id, username })
      );
      dispatchAppState(isShowInstagram(true));
      dispatchAppState(isLoadingMain(false));
    } catch (err) {
      console.log(`useGetInstagramMedias: ${err}`);
      alert('取得できませんでした');

      if (err.data.error.message.type === 'OAuthException') {
        console.log('message.typeは OAuthException');
        alert('インスタグラムアカウントの再連携が必要です');
        const params: T_instagram_accounts_reconnect_needed = {
          instagram_id: instagram_id,
          user_id: user_id,
          is_reconnect_needed: true,
        };
        try {
          await apiInstagramAccountsReconnectNeeded(params);
          dispatchInstagram(setReconnect(instagram_id));
        } catch (err) {
          console.log(`useGetInstagramMedias catch: ${err}`);
        }
      }

      dispatchAppState(isLoadingMain(false));
    }
  };
};
